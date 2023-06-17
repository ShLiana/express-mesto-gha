const router = require('express').Router();
const {
  getCards,
  addNewCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const {
  createCardValidation, cardIdValidation,
} = require('../middlewares/dataValidation');

router.get('/', getCards); // возвращает все карточки
router.post('/', createCardValidation, addNewCard); // создаёт карточку
router.delete('/:cardId', cardIdValidation, deleteCard); // удаляет карточку по идентификатору
router.put('/:cardId/likes', cardIdValidation, addCardLike); // поставить лайк карточке
router.delete('/:cardId/likes', cardIdValidation, deleteCardLike); // убрать лайк с карточки

module.exports = router;
