import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('products', { title: 'products page' });
});

export default router;
