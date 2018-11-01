import express from 'express';
import productController from '../controllers/productController';
import sales from '../controllers/salesController';
import verify from '../middlewares/verify/verify';
import auth from '../controllers/userController';
// import validateSignup from '../middlewares/validate/validateSignup';
// import validateProduct from '../middlewares/validate/validateProduct';
// import validateSales from '../middlewares/validate/validateProduct';

const {
  getAllProducts, getSpecificProduct, addProduct, updateProduct, deleteProduct,
} = productController;

const { getAllSales, getSpecificSale, addSale } = sales;
const { verifyAdmin, verifyAttendant, authVerify } = verify;

const {
  addUser, login, getAllUsers, getUser, updateUser, deleteUser,
} = auth;

const router = express.Router();

router.post('/auth/signup', /* authVerify, verifyAdmin, */ addUser);
router.post('/auth/login', login);
router.get('/users', authVerify, verifyAdmin, getAllUsers);
router.get('/users/:userId', authVerify, verifyAdmin, getUser);
router.put('/users/:userId', authVerify, updateUser);
router.delete('/users/:userId', authVerify, deleteUser);

router.get('/products', authVerify, getAllProducts);
router.get('/products/:productId', authVerify, getSpecificProduct);
router.post('/products', authVerify, verifyAdmin, addProduct);
router.put('/products/:productId', authVerify, verifyAdmin, updateProduct);
router.delete('/products/:productId', authVerify, verifyAdmin, deleteProduct);

router.get('/sales', authVerify, verifyAdmin, getAllSales);
router.get('/sales/:saleId', authVerify, getSpecificSale);
router.post('/sales', authVerify, verifyAttendant, addSale);

module.exports = router;
