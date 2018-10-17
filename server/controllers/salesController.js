import sales from '../models/sales';

exports.getAll = (req, res) => {
	return res.status(200).json(sales);
}

exports.getSale = (req, res) => {
	const saleId = req.params.saleId;
	let requiredRecord = null;
	
	sales.forEach((sale) => {
		if (sale.id == saleId) {
			requiredRecord = sale;
		};
	})
	
	return res.status(200).json(requiredRecord);
}

exports.addSale = (req, res) => {
	const { attendant, no_of_sales, products_sold, worth_of_sales } = req.body;
	const id = sales.length + 1;
	
	const newRecord = { id, attendant, no_of_sales, products_sold, worth_of_sales };
	
	sales.push(newRecord);
	return res.status(201).json({ newRecord, message: "New record created." });
}