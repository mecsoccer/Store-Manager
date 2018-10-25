function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) return res.status(422).send('Password field empty.');

  return next();
}

export default validatePassword;
