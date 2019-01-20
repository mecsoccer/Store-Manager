import dotenv from 'dotenv';

dotenv.config();

const userData = {
  admin: {
    username: 'jaachimma onyenze',
    password: process.env.ApiKey,
  },
  attendant: {
    username: process.env.AttendantUsername,
    password: process.env.AttendantKey,
  },
  newAttendant: {
    username: 'Onyenze',
    password: 'attendant0001',
    email: 'addattendant@gmail.com',
    productSold: '0',
    noOfSales: 0,
    worthOfSales: 0,
  },
  emptyFields: {
    username: '',
    password: '',
  },
  unknownUser: {
    username: 'winterbutter',
    password: 'adasd8ada',
  },
  attendantLogin: {},
};

export default userData;
