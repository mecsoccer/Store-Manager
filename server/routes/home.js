import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', { title: 'Pali Goobal' });
});

export default router;
