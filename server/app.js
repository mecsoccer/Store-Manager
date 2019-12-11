import http from 'http';
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import saleRouter from './routes/saleRoutes';
import botRouter from './routes/slackBotRoutes';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'false');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE');
  next();
});

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/sales', saleRouter);
app.use('/api/v1', botRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

console.log('listening at port', port);

module.exports = app;
