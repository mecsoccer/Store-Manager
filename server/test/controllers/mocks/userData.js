import dotenv from 'dotenv';

dotenv.config();

const userData = {
  admin: {
    usernameInput: 'admin',
    passwordInput: 'admin',
  },
  attendant: {
    usernameInput: 'attendant',
    passwordInput: 'attendant',
  },
  updateAttendant: {
    usernameInput: 'jaachido',
    passwordInput: 'jaachido',
    email: 'mecsoccerguy@gmail.com',
    role: 'attendant',
  },
  newAttendant: {
    username: 'onyenze',
    password: 'attendant0001',
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
