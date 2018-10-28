import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import ejs from 'ejs';
import pg from 'pg';
import format from 'pg-format';

import frontendRouter from './server/routes/home';
import apiRouter from './server/routes/index';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'UI'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'UI')));

app.use('/', frontendRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
const PGUSER = 'postgres';
const PGDATABASE = 'testdb';
const age = 732;

const config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);
let myClient;

pool.connect((err, client) => {
  if (err) console.log(err);

  myClient = client;
  const ageQuery = format('SELECT * from numbers WHERE age = %L', age);

  myClient.query(ageQuery, (error, result) => {
    if (error) {
      console.log(error);
    }
    console.log(result.rows[0]);
  });
});
*/

module.exports = app;
