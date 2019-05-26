"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _userData = _interopRequireDefault(require("./mocks/userData"));

var _saleData = _interopRequireDefault(require("./mocks/saleData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect;
var admin = _userData.default.admin,
    attendant = _userData.default.attendant;
var exampleSale = _saleData.default.exampleSale,
    wrongSellerName = _saleData.default.wrongSellerName,
    wrongProductName = _saleData.default.wrongProductName,
    wrongQuantity = _saleData.default.wrongQuantity,
    wrongPrice = _saleData.default.wrongPrice,
    wrongTotal = _saleData.default.wrongTotal,
    omittedField = _saleData.default.omittedField,
    zeroQuantity = _saleData.default.zeroQuantity,
    longSellerName = _saleData.default.longSellerName;
var wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphYWNoaWRvIiwicGFzc3dvcmQiOiIwNjM4NDU3OWhmIiwiaWF0IjoxNTQ3MDY4NzY2LCJleHAiOjE1NDcwNzIzNjZ9._L0BF4aCsGWU9jRJF8lsuu9_WLKyvEGpMJbn1KgSmSM';
var adminToken;
var attendantToken;
describe('Tests for sales', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      adminToken = res.body.token;
      done();
    });
  });
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      attendantToken = res.body.token;
      done();
    });
  });
  describe('get requests for sales', function () {
    it('Should return error if not admin', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales').set('Authorization', attendantToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('Should return sales record if user is admin', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });
    it('Should return a single sale if user is admin or the seller', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/1').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
    });
    it('Should return error for non-existent id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/100000').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('Should return error for invalid sale id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/ten').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
  describe('post requests for sales', function () {
    it('should return error message if non-attendant tries to access attendant route', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', adminToken).send({}).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error message if diffent attendant tries to access seller only route', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/1').set('Authorization', attendantToken).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return 401 and error message if request has bad token', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', wrongToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return 401 and error message if user is admin', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', adminToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error if a required field is omitted', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(omittedField).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('should respond with a 422 for invalid seller name', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongSellerName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('should respond with error for seller name too long', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(longSellerName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('respond with a 422 for invalid product name', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongProductName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('respond with a 422 for invalid quantity', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongQuantity).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('respond with a 422 for zero quantity', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(zeroQuantity).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('respond with a 422 for invalid product price', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongPrice).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('respond with a 422 for invalid product total', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongTotal).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
        done();
      });
    });
    it('should create sale record for attendant if data is valid', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object').that.has.property('newSale').that.is.an('object');
        done();
      });
    });
  });
});
//# sourceMappingURL=saleController.spec.js.map