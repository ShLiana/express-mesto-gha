const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  // берем токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верификация токена
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  // записать пейлоуд в объект запроса
  req.user = payload;
  // пропустить запрос далее
  next();
};
