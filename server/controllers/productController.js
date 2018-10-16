import products from '../models/products';
	
exports.getAll = function(req, res) {
	return res.status(200).json(products);
}
