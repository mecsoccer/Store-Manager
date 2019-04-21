import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../../models/database';

dotenv.config();

const secret = process.env.SECRET_KEY;

function authVerify(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, secret, (err, authData) => {
      if (err) {
        res.status(401).json({ error: 'please provide valid authorization' });
      }
      if (authData) {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Please, you have to sign in' });
  }
}

function verifyAdmin(req, res, next) {
  const { role } = req.authData;

  if (role === 'admin') {
    next();
  } else {
    res.status(401).json({ error: 'Sorry, accessible to admin only' });
  }
}

function verifyAttendant(req, res, next) {
  const { role } = req.authData;

  if (role === 'attendant') {
    next();
  } else {
    res.status(401).json({ error: 'Sorry, accessible to store attendants only' });
  }
}

function verifyOwner(req, res, next) {
  const { userId } = req.params;
  const { username } = req.authData;

  pool.query('SELECT * FROM users WHERE id=$1;', [userId])
    .then((userArray) => {
      const user = userArray.rows[0];
      return (user.username === username) ? next() : Promise.reject();
    })
    .catch(() => {
      res.status(401).json({ error: 'sorry, resource accessible to owner only' });
    });
}

export default {
  authVerify, verifyAdmin, verifyAttendant, verifyOwner,
};
