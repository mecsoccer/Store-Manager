import express from 'express';
import products from '../controllers/productController';
import sales from '../controllers/salesController';

const router = express.Router();

router.get('/products', products.getAll);
router.get('/products/:productId', products.getProduct);
router.post('/products', products.addProduct);

router.get('/sales', sales.getAll);
router.get('/sales/:saleId', sales.getSale);
router.post('/sales', sales.addSale);

module.exports = router;
