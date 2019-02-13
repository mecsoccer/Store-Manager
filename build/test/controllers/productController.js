"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _userData = _interopRequireDefault(require("./mocks/userData"));

var _productData = _interopRequireDefault(require("./mocks/productData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect;
var admin = _userData.default.admin,
    attendant = _userData.default.attendant;
var exampleProduct = _productData.default.exampleProduct;
var adminToken;
var attendantToken;
describe('products', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      adminToken = res.body.token;
    });

    _chai.default.request(_app.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      attendantToken = res.body.token;
      done();
    });
  });
  describe('get requests for products', function () {
    it('Should return all products', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('allProducts').that.is.an('array').that.has.length.greaterThan(0);
        done();
      });
    });
    it('Should return all available products', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products/available').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('availableProducts').that.is.an('array').that.has.length.greaterThan(0);
        done();
      });
    });
    it('Should return an existing product', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products/1').set('Authorization', attendantToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('product').that.is.an('object').that.has.property('id');
        done();
      });
    });
    it('Should not return product for non-existent id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products/20').set('Authorization', adminToken).end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('sorry, product does not exist');
        done();
      });
    });
  });
  describe('post requests for products', function () {
    it('attendants should not add products to the store', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', attendantToken).send(exampleProduct).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Sorry, accessible to admin only');
        done();
      });
    });
    it('admin should add products to the store', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(exampleProduct).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(201);
        expect(res.body.newProduct).to.have.property('id');
        done();
      });
    });
  });
});
//# sourceMappingURL=productController.js.map