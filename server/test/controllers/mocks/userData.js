const userData = {
  admin: {
    usernameInput: 'admin',
    passwordInput: 'admin123ABC#',
  },
  attendant: {
    usernameInput: 'attendant',
    passwordInput: 'attendantA1#',
  },
  invalidUsername: {
    usernameInput: '',
  },
  unknownUser: {
    usernameInput: 'winterbutter',
    passwordInput: 'adadaA1&',
  },
  invalidPasswordFormat: {
    usernameInput: 'jaachimma',
    passwordInput: '',
  },
  newAttendant: {
    username: 'onyenze',
    password: 'attendantA1#',
    email: 'addattendant@gmail.com',
    role: 'attendant',
  },
  updateAttendant: {
    username: 'jaachi',
    password: 'attendantA1#',
    email: 'mecsoccerguy@gmail.com',
    role: 'attendant',
  },
  invalidNewUsername: {
    username: 'Angel',
    password: 'jaachido',
    email: 'mecsoccerguy@gmail.com',
    role: 'admin',
  },
  invalidNewPassword: {
    username: 'jaachi',
    password: 'attendantA',
  },
  invalidNewEmail: {
    username: 'onyenze',
    password: 'attendantA1#',
    email: 'addattendant.com',
    role: 'attendant',
  },
  invalidSignupRole: {
    username: 'onyenze',
    password: 'attendantA1#',
    email: 'addattendant@gmail.com',
    role: 'user01',
  },
};

export default userData;
