class validate {
  static validateTextField(field, input, min = 2, max = 10, regEx, example, required = true) {
    let message = '';

    if (required === false) {
      message = true;
    } else if (!input) {
      message = `input ${field} must be included`;
    } else if (input.length < min || input.length > max) {
      message = `${field} length should be between ${min} and ${max}`;
    } else if (regEx.test(input) === false) {
      message = `wrong ${field} format. example ${field}s: ${example}`;
    } else {
      message = true;
    }

    return message;
  }

  static validateNumberField(field, input, min, max, regEx, example, required = true) {
    let message = '';

    if (required === false) {
      message = true;
    } else if (!input) {
      message = `input ${field} must be included`;
    } else if (input < min || input > max) {
      message = `${field} length should be between ${min} and ${max}`;
    } else if (regEx.test(input) === false) {
      message = `wrong ${field} format. example ${field}s: ${example}`;
    } else {
      return true;
    }

    return message;
  }
}

export default validate;
