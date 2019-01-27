import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../models/migration';

dotenv.config();

const secret = process.env.SECRET_KEY;

function getAllUsers(req, res) {
  const query = {
    text: 'SELECT * FROM users',
    values: [],
  };

  pool.query(query)
    .then((users) => {
      const allUsers = users.rows;
      res.status(200).json({ allUsers });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function getUser(req, res) {
  const { userId } = req.params;

  const query = {
    text: 'SELECT * FROM users WHERE id = $1;',
    values: [userId],
  };

  pool.query(query)
    .then((requestedUser) => {
      const user = requestedUser.rows[0];
      return res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function addUser(req, res) {
  const {
    username, password, email, role,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const query = {
    text: 'INSERT INTO users(username, password, email, productSold, noOfSales, worthOfSales, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [username, hash, email, 0, 0, 0, role],
  };

  pool.query(query)
    .then((user) => {
      const newAttendant = user.rows[0];
      return res.status(201).json({ newAttendant });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  const { usernameInput, passwordInput } = req.body;

  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [usernameInput],
  };

  pool.query(query)
    .then((user) => {
      const foundUser = user.rows[0];
      if (!bcrypt.compareSync(passwordInput, foundUser.password)) {
        return res.status(401).json({ error: true, message: 'username or password incorrect' });
      }
      return foundUser;
    })
    .then((foundUser) => {
      const { username, password, role } = foundUser;
      const token = jwt.sign({ username, password, role }, secret, { expiresIn: '1hr' });
      return res.status(200).json({ username, role, token });
    })
    .catch(() => {
      const [error, message] = [true, 'user does not exist'];
      return res.status(401).json({ error, message });
    });
}

function updateUser(req, res) {
  const {
    username, productSold, noOfSales, worthOfSales,
  } = req.body;
  const { userId } = req.params;

  const query = {
    text: 'UPDATE users SET productSold = $1,noOfSales =$2,worthOfSales = $3 WHERE username = $4 AND id = $5;',
    values: [productSold, noOfSales, worthOfSales, username, userId],
  };

  pool.query(query)
    .then((user) => {
      const updatedUser = user;
      return res.status(200).json({ updatedUser });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function deleteUser(req, res) {
  const { userId } = req.params;
  const { username } = req.body;

  const query = {
    text: 'DELETE FROM users WHERE id = $1 AND username = $2;',
    values: [userId, username],
  };

  pool.query(query)
    .then((user) => {
      const deletedUser = user;
      return res.status(200).json({ deletedUser });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
}

function giveAdminRight(req, res) {
  const { userId } = req.params;
  const { username, role } = req.body;

  const query = {
    text: 'UPDATE users SET role=$1 WHERE id=$2 and username=$3;',
    values: [role, userId, username],
  };

  pool.query(query)
    .then((user) => {
      const adminUser = user;
      return res.status(200).json({ adminUser });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

export default {
  addUser, login, getAllUsers, getUser, updateUser, deleteUser, giveAdminRight,
};
