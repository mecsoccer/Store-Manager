import express from 'express';
import productController from '../controllers/productController';
import saleController from '../controllers/salesController';
import verify from '../middlewares/verify/verify';
import userController from '../controllers/userController';
// import validateSales from '../middlewares/validate/validateSales';
import validateLogin from '../middlewares/validate/validateLogin';
// import validateSignup from '../middlewares/validate/validateSignup';
// import validateProduct from '../middlewares/validate/validateProduct';

const {
  getAllProducts,
  getAvailableProducts,
  getFinishedProducts,
  getSpecificProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productController;

const { getAllSales, getSpecificSale, addSale } = saleController;
const {
  addUser, login, getAllUsers, getUser, updateUserSales, updateUserData, deleteUser, giveAdminRight,
} = userController;

const {
  authVerify, verifyAdmin, verifyAttendant, verifyOwner,
} = verify;

const router = express.Router();

router.post('/auth/signup', authVerify, verifyAdmin, addUser);
router.post('/auth/login', validateLogin, login);
router.get('/users', authVerify, verifyAdmin, getAllUsers);
router.get('/users/:userId', authVerify, verifyAdmin, getUser);
router.put('/users/:userId/data', authVerify, verifyOwner, updateUserData);
router.put('/users/:userId/sales', authVerify, updateUserSales);
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
router.get('/sales/:saleId', authVerify, getSpecificSale);
router.post('/sales', authVerify, verifyAttendant, addSale);

module.exports = router;
