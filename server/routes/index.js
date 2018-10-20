import express from 'express';
import products from '../controllers/productController';
import sales from '../controllers/salesController';
import verify from '../middlewares/verify';

const router = express.Router();

router.get('/products', products.getAll);
router.get('/products/:productId', products.getProduct);
router.post('/products', verify.admin, products.addProduct);

router.get('/sales', verify.admin, sales.getAll);
router.get('/sales/:saleId', verify.adminOrAttendant, sales.getSale);
router.post('/sales', verify.attendant, sales.addSale);

module.exports = router;
