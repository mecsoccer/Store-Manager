import dotenv from 'dotenv';

dotenv.config();

const userData = {
  admin: {
    usernameInput: 'jaachimma onyenze',
    passwordInput: process.env.ApiKey,
  },
  attendant: {
    usernameInput: process.env.AttendantUsername,
    passwordInput: process.env.AttendantKey,
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
