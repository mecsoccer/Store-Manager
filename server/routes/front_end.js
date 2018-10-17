import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('products', { title: 'Express' });
});

module.exports = router;
