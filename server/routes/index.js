import express from 'express';
import products from '../controllers/productController';

const router = express.Router();

router.get('/products', products.getAll);

module.exports = router;
