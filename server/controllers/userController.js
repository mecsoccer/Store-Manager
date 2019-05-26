import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../models/migration';

dotenv.config();

const secret = process.env.SECRET_KEY;

function getAllUsers(req, res) {
  pool.query('SELECT * FROM users')
    .then((users) => {
      const allUsers = users.rows;
      res.status(200).json({ allUsers });
    })
    .catch(/* istanbul ignore next */err => res.status(500).json(err));
}

function getUser(req, res) {
  const { userId } = req.params;

  pool.query('SELECT * FROM users WHERE id = $1;', [userId])
    .then((requestedUser) => {
      const user = requestedUser.rows[0];
      /* istanbul ignore next */return !user ? Promise.reject() : user;
    })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch(() => {
      res.status(404).json({ error: `user id, ${userId} does not exist` });
    });
}

function addUser(req, res) {
  const {
    username, password, email, role,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const query = {
    text: 'INSERT INTO users(username, password, email, role) VALUES($1, $2, $3, $4) RETURNING *',
    values: [username, hash, email, role],
  };

  pool.query(query)
    .then((user) => {
      const newAttendant = user.rows[0];
      res.status(201).json({ newAttendant });
    })
    .catch(() => {
      res.status(422).json({ error: 'data with same username already exists' });
    });
}

function login(req, res) {
  const { usernameInput, passwordInput } = req.body;

  pool.query('SELECT * FROM users WHERE username = $1', [usernameInput])
    .then((user) => {
      const foundUser = user.rows[0];
      const authenticated = bcrypt.compareSync(passwordInput, foundUser.password);
      /* istanbul ignore next */return (!authenticated) ? Promise.reject() : foundUser;
    })
    .then((foundUser) => {
      const { username, password, role } = foundUser;
      const token = jwt.sign({ username, password, role }, secret, { expiresIn: '1hr' });
      res.status(200).json({ username, role, token });
    })
    .catch(() => {
      res.status(401).json({ error: 'incorrect username or password' });
    });
}

function updateUserData(req, res) {
  const { userId } = req.params;
  const {
    username, password, email, role,
  } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const text = 'UPDATE users SET username=$1, password=$2, email=$3, role=$4 WHERE id=$5 RETURNING *;';
  const values = [
    username, hashPassword, email, role, userId,
  ];

  pool.query(text, values)
    .then((userArray) => {
      const user = userArray.rows[0];
      /* istanbul ignore next */return !user ? Promise.reject() : user;
    })
    .then((updatedUser) => {
      res.status(200).json({ updatedUser });
    })
    .catch(() => {
      res.status(422).json({ error: 'unnable to complete request. choose another username or new id' });
    });
}

function deleteUser(req, res) {
  const { userId } = req.params;

  const text = 'DELETE FROM users WHERE id = $1 returning *;';
  const values = [userId];

  pool.query(text, values)
    .then((user) => {
      const deletedUser = user.rows[0];
      /* istanbul ignore next */return !deletedUser ? Promise.reject(userId) : deletedUser;
    })
    .then((deletedUser) => {
      res.status(200).json({ deletedUser });
    })
    .catch((id) => {
      res.status(404).json({ error: `user id, ${id} does not exist` });
    });
}

function giveAdminRight(req, res) {
  const { userId } = req.params;
  const { admin } = req.body;
  /* istanbul ignore next */const role = (admin === true) ? 'admin' : 'attendant';

  const text = 'UPDATE users SET role=$1 WHERE id=$2 returning *;';
  const values = [role, userId];

  pool.query(text, values)
    .then((user) => {
      const adminUser = user.rows[0];
      /* istanbul ignore next */return (!adminUser) ? Promise.reject(userId) : adminUser;
    })
    .then((newAdmin) => {
      res.status(200).json({ newAdmin });
    })
    .catch((errorId) => {
      res.status(404).json({ error: `user id, ${errorId} does not exist` });
    });
}

export default {
  addUser, login, getAllUsers, getUser, updateUserData, deleteUser, giveAdminRight,
};
