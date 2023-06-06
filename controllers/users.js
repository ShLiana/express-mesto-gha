const User = require('../models/user');
const { ERROR_STATUS } = require('../utils/errors');

// Получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(ERROR_STATUS.OK).send({ data: users }))
    .catch(next);
};

// Добавить нового пользователя
const addNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(ERROR_STATUS.CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({
          message: 'Некорректный запрос при создании пользователя',
        });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Получить пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(ERROR_STATUS.OK).send({ data: user });
      } else {
        res.status(ERROR_STATUS.NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_STATUS.BAD_REQUEST)
          .send({ message: 'Некорректный запрос на сервер' });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Обновить аватар пользователя
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.status(ERROR_STATUS.OK).send(user);
      } else {
        res
          .status(ERROR_STATUS.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({
          message: 'Некорректный запрос при обновлении аватара',
        });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Обновляем данные профиля пользователя
const updateProfileInfo = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.status(ERROR_STATUS.OK).send(user);
      } else {
        res
          .status(ERROR_STATUS.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({
          message: 'Некорректный запрос при обновлении информации о пользователе',
        });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  addNewUser,
  getUserById,
  updateAvatar,
  updateProfileInfo,
};
