function validateLogin(req, res, next) {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.status(422).json({ error: true, message: 'username and password fields must not be empty' });
  }

  next();
}

export default validateLogin;
