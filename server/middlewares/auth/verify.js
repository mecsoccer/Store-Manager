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
        res.status(401).json({ error: 'please provide valid token' });
      }
      if (authData) {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'please, you have to sign in' });
  }
}

function verifyAdmin(req, res, next) {
  const { role } = req.authData;

  if (role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Sorry, accessible to admin only' });
  }
}

function verifyAttendant(req, res, next) {
  const { role } = req.authData;

  if (role === 'attendant') {
    next();
  } else {
    res.status(403).json({ error: 'Sorry, accessible to store attendants only' });
  }
}

function verifyAdminOrSeller(req, res, next) {
  const { saleId } = req.params;
  const { id, role } = req.authData;

  pool.query('SELECT * FROM sales WHERE orderId=$1;', [saleId])
    .then((salesArray) => {
      const sale = salesArray.rows[0];
      if (!sale) {
        res.status(404).json({ error: 'sale record does not exist' });
      } else if (sale.seller === id || role === 'admin') {
        next();
      } else {
        res.status(403).json({ error: 'sorry, resource accessible to seller and admin only' });
      }
    })
    .catch(/* istanbul ignore next */err => res.status(500).json({ err: err.message }));
}

export default {
  authVerify, verifyAdmin, verifyAttendant, verifyAdminOrSeller,
};
