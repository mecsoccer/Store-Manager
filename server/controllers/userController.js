
function addAttendant(req, res) {
  const { username, password, email } = req.body;

  const [productSold, noOfSales, worthOfSales] = [0, 0, 0];
  const newAttendant = {
    username, password, email, productSold, noOfSales, worthOfSales,
  };

  return res.status(200).json({ newAttendant });
}

export default addAttendant;
