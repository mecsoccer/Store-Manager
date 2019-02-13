"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _userData = _interopRequireDefault(require("./mocks/userData"));

var _salesData = _interopRequireDefault(require("./mocks/salesData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect;
var admin = _userData.default.admin,
    attendant = _userData.default.attendant;
var exampleSale = _salesData.default.exampleSale,
    wrongSellerName = _salesData.default.wrongSellerName,
    wrongProductName = _salesData.default.wrongProductName,
    wrongQuantity = _salesData.default.wrongQuantity,
    wrongPrice = _salesData.default.wrongPrice,
    wrongTotal = _salesData.default.wrongTotal;
var wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphYWNoaWRvIiwicGFzc3dvcmQiOiIwNjM4NDU3OWhmIiwiaWF0IjoxNTQ3MDY4NzY2LCJleHAiOjE1NDcwNzIzNjZ9._L0BF4aCsGWU9jRJF8lsuu9_WLKyvEGpMJbn1KgSmSM';
var adminToken;
var attendantToken;
describe('Tests for sales', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      adminToken = res.body.token;
    });

    _chai.default.request(_app.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      attendantToken = res.body.token;
      done();
    });
  });
  describe('get requests for sales', function () {
    it('Should not return sales record if not admin', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales').set('Authorization', attendantToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Sorry, accessible to admin only');
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
    it('Should return a single sale if admin', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/1').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
    });
    it('Should return an existing sale if attendant', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/1').set('Authorization', attendantToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
    });
    it('Should not return sale for non-existent id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/sales/10000000').set('Authorization', attendantToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('sorry, the sale record does not exist');
        done();
      });
    });
  });
  describe('post requests for sales', function () {
    it('should return 401 and error message if request has bad token', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', wrongToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.equals('You must provide valid authorization');
        done();
      });
    });
    it('should return 401 and error message if user is admin', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', adminToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.equals('Sorry, accessible to store attendants only');
        done();
      });
    });
    it('respond with a 422 for invalid seller name', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongSellerName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });
    it('respond with a 422 for invalid product name', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongProductName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });
    it('respond with a 422 for invalid quantity', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongQuantity).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });
    it('respond with a 422 for invalid product price', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongPrice).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });
    it('respond with a 422 for invalid product total', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(wrongTotal).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
        expect(res.body).to.be.an('object').that.has.property('message');
        expect(res).to.have.status(422);
        done();
      });
    });
    it('should create sale record for attendant if data is valid', function (done) {
      _chai.default.request(_app.default).post('/api/v1/sales').set('Authorization', attendantToken).send(exampleSale).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('newSale');
        done();
      });
    });
  });
});
//# sourceMappingURL=salesController.js.map