function validateLogin(req, res, next) {
  const { usernameInput, passwordInput } = req.body;

  if (usernameInput === '' || passwordInput === '') {
    res.status(422).json({ error: true, message: 'username and password fields must not be empty' });
  }

  next();
}

export default validateLogin;
