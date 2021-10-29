const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards, deleteCard, createCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), auth, deleteCard);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('передайте ссылку');
    })),
  }),
}), auth, createCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), auth, addLike);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), auth, deleteLike);

module.exports = router;
