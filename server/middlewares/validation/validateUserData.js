import validationLibrary from './library/validationLibrary';

const { validateTextField } = validationLibrary;

class ValidateUserData {
  static validateLogin(req, res, next) {
    const { usernameInput, passwordInput } = req.body;

    const usernameValid = validateTextField('usernameInput', usernameInput, 2, 15, /^\w+$/, 'john23, doe, 3233_john');
    const passwordValid = validateTextField('passwordInput', passwordInput, 6, 12, /[a-z]?[A-Z]?[0-9]?[$#@]?/, 'asAS997$, asAS997#, asAS997@');

    if (usernameValid !== true) {
      res.status(422).json({ error: usernameValid });
    } else if (passwordValid !== true) {
      res.status(422).json({ error: passwordValid });
    } else {
      next();
    }
  }

  static validateSignup(req, res, next) {
    const {
      username, password, email, role,
    } = req.body;

    const usernameValid = validateTextField('username', username, 2, 15, /^\w+$/, 'john23, doe, 3233');
    const passwordValid = validateTextField('password', password, 6, 12, /[a-z]+[A-Z]+[0-9]+[$#@]+/, 'asAS997$, asAS997#, asAS997@');
    const emailValid = validateTextField('email', email, 3, 50, /\w+[-.]*\w+@\w+[.][a-z]+/, 'john234.doe@gmail.com, johndoe@gmail.com');
    const roleValid = validateTextField('role', role, 5, 9, /^[a-z]+$/, 'attendant, admin');

    if (usernameValid !== true) {
      res.status(422).json({ error: usernameValid });
    } else if (passwordValid !== true) {
      res.status(422).json({ error: passwordValid });
    } else if (emailValid !== true) {
      res.status(422).json({ error: emailValid });
    } else if (roleValid !== true) {
      res.status(422).json({ error: roleValid });
    } else {
      next();
    }
  }
}

export default ValidateUserData;
