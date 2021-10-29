const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');
const MongoServerError = require('../errors/MongoServerError');
const NotValidId = require('../errors/NotValidId');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
    );
    res.send({ token });
  }).catch(next);
};
const getUserMe = (req, res, next) => {
  const currentUserId = req.user._id;
  User.findOne({ _id: currentUserId }).then((user) => {
    if (!user) {
      throw new NotValidId('Пользователь по указанному _id не найден');
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError('Переданы некорректные данные при создании пользователя');
    }
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные');
    }
    next(err);
  }).catch(next);
};

const getUsers = (req, res, next) => {
  User.find({}).then((user) => {
    res.send({ data: user });
  }).catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      throw new NotValidId('Пользователь по указанному _id не найден');
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError('Переданы некорректные данные при создании пользователя');
    }
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные');
    }
    next(err);
  })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании пользователя');
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new MongoServerError('При регистрации указан email, который уже существует на сервере');
      }
      next(err);
    })
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotValidId('Нет пользователя с таким id');
      }
      res.send({ data: user });
    }).catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Переданы некорректные данные при создании пользователя');
      }
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

const changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    { new: true, runValidators: true })
    .then((userAvatar) => {
      if (!userAvatar) {
        throw new NotValidId('Нет пользователя с таким id');
      }
      res.send({ data: userAvatar });
    }).catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Переданы некорректные данные при создании пользователя');
      }
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  changeUserInfo,
  changeUserAvatar,
  createUser,
  getUsers,
  login,
  getUser,
  getUserMe,
};
