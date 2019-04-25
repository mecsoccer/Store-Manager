const userData = {
  admin: {
    usernameInput: 'admin',
    passwordInput: 'admin123ABC#',
  },
  attendant: {
    usernameInput: 'attendant',
    passwordInput: 'attendant1A#',
  },
  invalidUserData: {
    username: '',
    password: 'jaachido',
    email: 'mecsoccerguy@gmail.com',
    role: 'admin',
  },
  updateAttendant: {
    username: 'attendant',
    password: 'attendant1A#',
    email: 'mecsoccerguy@gmail.com',
    role: 'attendant',
  },
  newAttendant: {
    username: 'onyenze',
    password: 'attendant1A#',
    email: 'addattendant@gmail.com',
    role: 'attendant',
  },
  emptyFields: {
    usernameInput: '',
    passwordInput: '',
  },
  unknownUser: {
    usernameInput: 'winterbutter',
    passwordInput: 'adasd8ada',
  },
  attendantLogin: {},
};

export default userData;
