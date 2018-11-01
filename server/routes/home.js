import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('products', { title: 'products page' });
});

export default router;
