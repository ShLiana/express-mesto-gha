const router = require('express').Router();
const {
  getUsers,
  getUserById,
  addNewUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/:userId', getUserById); // возвращает пользователя по _id
router.post('/users', addNewUser); // создаёт пользователя
router.patch('/users/me/avatar', updateAvatar); // обновляет аватар

module.exports = router;
