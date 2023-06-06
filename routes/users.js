const router = require('express').Router();
const {
  getUsers,
  getUserById,
  addNewUser,
  updateAvatar,
  updateProfileInfo,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/:userId', getUserById); // возвращает пользователя по _id
router.post('/users', addNewUser); // создаёт пользователя
router.patch('/users/me/avatar', updateAvatar); // обновляет аватар
router.patch('/users/me', updateProfileInfo); // обновляет информацию в профиле

module.exports = router;
