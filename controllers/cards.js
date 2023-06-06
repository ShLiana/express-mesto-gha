const Card = require('../models/card');
const { ERROR_STATUS } = require('../utils/errors');

// Получить все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(ERROR_STATUS.OK).send({ data: cards }))
    .catch(next);
};

// Добавить новую карточку
const addNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(ERROR_STATUS.CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({
          message: 'Введены некорректные данные при добавлении карточки',
        });
      } else {
        res.status(ERROR_STATUS.SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

// Поставить лайк карточке
const addCardLike = (req, res) => {
  // Метод поиска по id и обновления документа
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_STATUS.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_STATUS.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_STATUS.BAD_REQUEST)
          .send({ message: 'Некорректный запрос' });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Удалить лайк с карточки
const deleteCardLike = (req, res) => {
  // Метод поиска по id и обновления карточки
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_STATUS.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_STATUS.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_STATUS.BAD_REQUEST)
          .send({ message: 'Некорректный запрос' });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Удалить карточку
const deleteCard = (req, res) => {
  // Метод поиска по id и удаления карточки
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_STATUS.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_STATUS.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_STATUS.BAD_REQUEST)
          .send({ message: 'Некорректный запрос' });
      } else {
        res
          .status(ERROR_STATUS.SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  addNewCard,
  addCardLike,
  deleteCardLike,
  deleteCard,
};
