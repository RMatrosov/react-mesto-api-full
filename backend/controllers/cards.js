const Card = require('../models/card');
const NotValidId = require('../errors/NotValidId');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({}).then((cards) => {
    res.send({ data: cards });
  }).catch(next);
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.cardId).then((deletedCard) => {
    if (!deletedCard) {
      throw new NotValidId('Карточка с указанным _id не найдена');
    }
    if (deletedCard.owner.toString() !== owner.toString()) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    return Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        res.send({ data: card });
      });
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError(' Переданы некорректные данные');
    }
    next(err);
  })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании карточки');
      }
      next(err);
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, { new: true })
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotValidId('Карточка с указанным _id не найдена');
      }
      res.send({ data: updatedCard });
    }).catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Переданы некорректные данные для постановки/снятии лайка');
      }
      next(err);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotValidId('Карточка с указанным _id не найдена');
      }
      res.send({ data: updatedCard });
    }).catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Переданы некорректные данные для постановки/снятии лайка');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  addLike,
  deleteLike,
};
