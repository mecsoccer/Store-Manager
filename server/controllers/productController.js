import products from '../models/products';
	
exports.getAll = function(req, res) {
	return res.status(200).json(products.products);
}

exports.getProduct = function (req, res) {
	const productId = req.params.productId;
	products.products.forEach((product) => {
		if (product.id == productId) {
			return res.status(200).json(product);
		};
	})
}

