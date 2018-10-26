import sales from '../models/sales';

function getAllSales(req, res) {
  res.status(200).json(sales);
}

function getSpecificSale(req, res) {
  const { saleId } = req.params;
  let requiredRecord = null;

  sales.forEach((sale) => {
    if (sale.id == saleId) {
      requiredRecord = sale;
    }
  });

  if (requiredRecord === null) {
    return res.status(404).json({ message: 'Sorry, the sale record does not exist' });
  }

  return res.status(200).json(requiredRecord);
}

function addSale(req, res) {
  const {
    date, creator, productName, quantity, price, total,
  } = req.body;

  const id = sales.length + 1;

  const newRecord = {
    id, date, creator, productName, quantity, price, total,
  };

  sales.push(newRecord);
  return res.status(201).json({ newRecord, message: 'New record created' });
}

export default { getAllSales, getSpecificSale, addSale };
