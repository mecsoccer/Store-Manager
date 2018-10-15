import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('Respond with a resource.');
});

module.exports = router;