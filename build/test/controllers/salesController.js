'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _userData = require('./mocks/userData');

var _userData2 = _interopRequireDefault(_userData);

var _salesData = require('./mocks/salesData');

var _salesData2 = _interopRequireDefault(_salesData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;
var admin = _userData2.default.admin,
    attendant = _userData2.default.attendant;
var exampleSale = _salesData2.default.exampleSale,
    wrongSellerName = _salesData2.default.wrongSellerName,
    wrongProductName = _salesData2.default.wrongProductName,
    wrongQuantity = _salesData2.default.wrongQuantity,
    wrongPrice = _salesData2.default.wrongPrice,
    wrongTotal = _salesData2.default.wrongTotal;


var wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphYWNoaWRvIiwicGFzc3dvcmQiOiIwNjM4NDU3OWhmIiwiaWF0IjoxNTQ3MDY4NzY2LCJleHAiOjE1NDcwNzIzNjZ9._L0BF4aCsGWU9jRJF8lsuu9_WLKyvEGpMJbn1KgSmSM';

var adminToken = void 0;
var attendantToken = void 0;

describe('Tests for sales', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      adminToken = res.body.token;
      done();
    });
  });

  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      attendantToken = res.body.token;
      done();
    });
  });

  context('#get requests for sales', function () {
    it('Should not return sales record if not admin', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/sales').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Sorry, accessible to admin only');
        done();
      });
    });

    it('Should return sales record if user is admin', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/sales').set('Authorization', 'Bearer admin').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });

    it('Should return an existing sale if admin', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/sales/1').set('Authorization', 'Bearer admin').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });

    it('Should return an existing sale if attendant', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/sales/1').set('Authorization', 'Bearer attendant').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });

    it('Should not return sale for non-existent id', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/sales/20').set('Authorization', 'Bearer admin').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Sorry, the sale record does not exist');
        done();
      });
    });
  });

  context('#post requests for sales', function () {
    it('should return 401 and error message if request has bad token', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', wrongToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.equals('You must provide valid authorization');
        done();
      });
    });

    it('should return 401 and error message if user is admin', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', adminToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.equals('Sorry, accessible to store attendants only');
        done();
      });
    });

    it('respond with a 422 for invalid seller name', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', attendantToken).send({ wrongSellerName: wrongSellerName }).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });

    it('respond with a 422 for invalid product name', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', attendantToken).send({ wrongProductName: wrongProductName }).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });

    it('respond with a 422 for invalid quantity', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', attendantToken).send({ wrongQuantity: wrongQuantity }).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });

    it('respond with a 422 for invalid product price', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', attendantToken).send({ wrongPrice: wrongPrice }).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });

    it('respond with a 422 for invalid product total', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', attendantToken).send({ wrongTotal: wrongTotal }).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });

    it('should create sale record for attendant if data is valid', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', attendantToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('newSale');
        done();
      });
    });
  });
});
//# sourceMappingURL=salesController.js.map