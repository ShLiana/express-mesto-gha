const router = require('express').Router();
const {
  getCards,
  addNewCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/cards', getCards); // возвращает все карточки
router.post('/cards', addNewCard); // создаёт карточку
router.delete('/cards/:cardId', deleteCard); // удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', addCardLike); // поставить лайк карточке
router.delete('/cards/:cardId/likes', deleteCardLike); // убрать лайк с карточки

module.exports = router;
