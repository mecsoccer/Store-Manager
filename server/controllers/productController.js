import products from '../models/products';
	
exports.getAll = function(req, res) {
	return res.status(200).json(products.products);
}

exports.getProduct = function (req, res) {
	const productId = req.params.productId;
	let requiredProduct = null;
	
	products.products.forEach((product) => {
		if (product.id == productId) {
			requiredProduct = product;
		};
	})
	
	return res.status(200).json(requiredProduct);
}

exports.addProduct = function (req, res) {
	const { name, category, qty_left, qty_sold, price, min_qty } = req.body;
	const id = products.length + 1;
	
	const newProduct = { id, name, category, qty_left, qty_sold, price, min_qty };
	
	products.products.push(newProduct);
	return res.status(201).json({ created: newProduct, success: true });
}