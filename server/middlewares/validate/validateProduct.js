function validateName(req, res, next) {
  const { productName } = req.body;

  if (!productName || productName.length <= 1) {
    return res.status(422)
      .send('productName field must not be empty');
  }

  return next();
}

function validateId(req, res, next) {
  const { id } = req.body;
  
  if () {
    
  };
  
  return next()
}

function number(req, res, next) {
  const { id } = req.body;
  
  if () {
    
  };
  
  return next()
}



export default { validateName, validateId };
