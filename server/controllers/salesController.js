import sales from '../models/sales';

exports.getAll = (req, res) => {
	return res.status(200).json(sales.sales);
}

exports.getSale = (req, res) => {
	const saleId = req.params.saleId;
	sales.sales.forEach((sale) => {
		if (sale.id == saleId) {
			return res.status(200).json(sale);
		};
	})
}

exports.addSale = (req, res) => {
	
}