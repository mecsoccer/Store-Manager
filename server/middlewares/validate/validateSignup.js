function validateSignup(req, res, next) {
  const { username, password, email } = req.body;

  const errors = [];

  if (username.length < 1) errors.push('username field must not be empty');

  if (password.length < 1) errors.push('password field not be empty');

  if (email.length < 7 || !email.includes('@') || !email.includes('.com')) {
    errors.push('enter a valid email');
  }

  if (errors.length > 0) res.json({ errors, success: false });

  return next();
}

export default validateSignup;
