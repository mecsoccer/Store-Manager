import express from 'express';
import products from '../controllers/productController';
import sales from '../controllers/salesController';
import verify from '../middlewares/verify/verify';
import signup from '../controllers/userController';
import login from '../controllers/loginController';
import validateSignup from '../middlewares/validate/validateSignup';
import validateProduct from '../middlewares/validate/validateProduct';
import validateSales from '../middlewares/validate/validateProduct';


const { getAllProducts, getSpecificProduct, addProduct } = products;
const { getAllSales, getSpecificSale, addSale } = sales;
const { verifyAdmin, verifyAttendant, verifyAdminOrAttendant } = verify;

const router = express.Router();

router.post('/auth/signup', verifyAdmin, validateSignup, signup);
router.post('/auth/login', login);

router.get('/products', getAllProducts);
router.get('/products/:productId', getSpecificProduct);
router.post('/products', verifyAdmin, validateProduct, addProduct);

router.get('/sales', verifyAdmin, getAllSales);
router.get('/sales/:saleId', verifyAdminOrAttendant, getSpecificSale);
router.post('/sales', verifyAttendant, validateSales, addSale);

module.exports = router;
