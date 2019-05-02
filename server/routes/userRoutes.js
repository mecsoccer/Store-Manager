import express from 'express';
import userController from '../controllers/userController';
import validateUserData from '../middlewares/validation/validateUserData';
import verify from '../middlewares/auth/verify';

const {
  addUser, login, getAllUsers, getUser,
  updateUserData, deleteUser, giveAdminRight,
} = userController;

const {
  authVerify, verifyAdmin,
} = verify;

const { validateLogin, validateSignup } = validateUserData;

const router = express.Router();

router.post('/signup', authVerify, verifyAdmin, validateSignup, addUser);
router.post('/login', validateLogin, login);
router.get('', authVerify, verifyAdmin, getAllUsers);
router.get('/:userId', authVerify, verifyAdmin, getUser);
router.put('/:userId', authVerify, verifyAdmin, validateSignup, updateUserData);
router.put('/authorization/:userId', authVerify, verifyAdmin, giveAdminRight);
router.delete('/:userId', authVerify, deleteUser);

module.exports = router;
