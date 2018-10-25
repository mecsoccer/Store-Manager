import express from 'express';
import products from '../controllers/productController';
import sales from '../controllers/salesController';
import verify from '../middlewares/verify';

const { getAllProducts, getSpecificProduct, addProduct } = products;
const { getAllSales, getSpecificSale, addSale } = sales;
const { verifyAdmin, verifyAttendant, verifyAdminOrAttendant } = verify;

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:productId', getSpecificProduct);
router.post('/products', verifyAdmin, addProduct);

router.get('/sales', verifyAdmin, getAllSales);
router.get('/sales/:saleId', verifyAdminOrAttendant, getSpecificSale);
router.post('/sales', verifyAttendant, addSale);

module.exports = router;
