const { check } = require('express-validator/check');

exports.product = [
	check('name').isLength({ min: 3 }),
	check('category').isNumeric(),
	check('qty_left').isNumeric(),
	check('qty_sold').isNumeric(),
	check('price').isNumeric(),
	check('min_qty').isNumeric()
];