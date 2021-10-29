const jwt = require('jsonwebtoken');
const NotValidEmailOrPassword = require('../errors/NotValidEmailOrPassword');
const { JWT_SECRET, NODE_ENV } = process.env;

const handleAuthError = () => {
  throw new NotValidEmailOrPassword('передан неверный логин или пароль');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
