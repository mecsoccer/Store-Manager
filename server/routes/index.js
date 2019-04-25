import express from 'express';
import productController from '../controllers/productController';
import saleController from '../controllers/salesController';
import verify from '../middlewares/verify/verify';
import userController from '../controllers/userController';
import validateUserData from '../middlewares/validate/validateUserData';

const {
  getAllProducts,
  getAvailableProducts,
  getFinishedProducts,
  getSpecificProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productController;

const {
  getAllSales, getSpecificSale, addSale,
} = saleController;
const {
  addUser, login, getAllUsers, getUser,
  updateUserData, deleteUser, giveAdminRight,
} = userController;

const {
  authVerify, verifyAdmin, verifyAttendant,
  verifyAdminOrSeller,
} = verify;

const { validateLogin, validateSignup } = validateUserData;

const router = express.Router();

router.post('/auth/signup', authVerify, verifyAdmin, validateSignup, addUser);
router.post('/auth/login', validateLogin, login);
router.get('/users', authVerify, verifyAdmin, getAllUsers);
router.get('/users/:userId', authVerify, verifyAdmin, getUser);
router.put('/users/:userId', authVerify, verifyAdmin, validateSignup, updateUserData);
router.put('/users/authorization/:userId', authVerify, verifyAdmin, giveAdminRight);
router.delete('/users/:userId', authVerify, deleteUser);

router.get('/products', authVerify, getAllProducts);
router.get('/products/available', authVerify, getAvailableProducts);
router.get('/products/finished', authVerify, getFinishedProducts);
router.get('/products/:productId', authVerify, getSpecificProduct);
router.post('/products', authVerify, verifyAdmin, addProduct);
router.put('/products/:productId', authVerify, updateProduct);
router.delete('/products/:productId', authVerify, verifyAdmin, deleteProduct);

router.get('/sales', authVerify, verifyAdmin, getAllSales);
router.get('/sales/:saleId', authVerify, verifyAdminOrSeller, getSpecificSale);
router.post('/sales', authVerify, verifyAttendant, addSale);

module.exports = router;
