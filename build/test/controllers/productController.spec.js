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
var exampleProduct = _productData.default.exampleProduct,
    invalidProductName = _productData.default.invalidProductName,
    invalidProductCategory = _productData.default.invalidProductCategory,
    invalidProductPrice = _productData.default.invalidProductPrice,
    invalidProductLeft = _productData.default.invalidProductLeft,
    invalidProductSold = _productData.default.invalidProductSold,
    invalidMinQuantity = _productData.default.invalidMinQuantity,
    invalidQuantitySold = _productData.default.invalidQuantitySold,
    invalidProductDetails = _productData.default.invalidProductDetails,
    updateQuantitySold = _productData.default.updateQuantitySold,
    updateProductDetails = _productData.default.updateProductDetails;
var adminToken;
var attendantToken;
describe('products', function () {
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
  describe('Tests for no token or bad token cases', function () {
    it('should return error message if no token', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').send({}).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error message if token is blank', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', '').send({}).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error message if token is invalid', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphYWNoaWRvIiwicGFzc3dvcmQiOiIwNjM4NDU3OWhmIiwiaWF0IjoxNTQ3MDY4NzY2LCJleHAiOjE1NDcwNzIzNjZ9._L0BF4aCsGWU9jRJF8lsuu9_WLKyvEGpMJbn1KgSmSM').send({}).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
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
    it('Should return all finished products', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products/finished').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('finishedProducts').that.is.an('array').that.has.length.greaterThan(0);
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
    it('Should not return product for invalid id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products/ten').set('Authorization', adminToken).end(function (err, res) {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('Should return error for non-existent id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/products/10000').set('Authorization', attendantToken).end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
  describe('post requests for products', function () {
    it('attendant should not add products to the store', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', attendantToken).send(exampleProduct).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('product name should follow a format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(invalidProductName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('product category should follow a format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(invalidProductCategory).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('product price should follow a format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(invalidProductPrice).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('product quantity left should follow a format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(invalidProductLeft).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('product quantity sold should follow a format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(invalidProductSold).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('product min. quantity should follow a format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(invalidMinQuantity).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
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
    it('product name should be unique', function (done) {
      _chai.default.request(_app.default).post('/api/v1/products').set('Authorization', adminToken).send(exampleProduct).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
  describe('Update products', function () {
    it('product details should follow the correct format', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/details/3').set('Authorization', adminToken).send(invalidProductDetails).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error for non-existent product id while updating details', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/details/10000').set('Authorization', adminToken).send(updateProductDetails).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('attendant should not update product details', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/details/3').set('Authorization', attendantToken).send(updateProductDetails).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').that.is.an('string');
        done();
      });
    });
    it('admin should update product details', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/details/3').set('Authorization', adminToken).send(updateProductDetails).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('updatedProduct').that.is.an('object');
        done();
      });
    });
    it('quantity sold should follow the correct format', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/quantity-sold/3').set('Authorization', attendantToken).send(invalidQuantitySold).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.an('string');
        done();
      });
    });
    it('should return error for non-existent id while updating quantiy sold', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/quantity-sold/100000').set('Authorization', attendantToken).send(updateQuantitySold).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').that.is.an('string');
        done();
      });
    });
    it('admin should not update quantity sold', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/quantity-sold/3').set('Authorization', adminToken).send(updateQuantitySold).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').that.is.an('string');
        done();
      });
    });
    it('attendant should update quantity sold', function (done) {
      _chai.default.request(_app.default).put('/api/v1/products/quantity-sold/3').set('Authorization', attendantToken).send(updateQuantitySold).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('updatedProduct').that.is.an('object');
        done();
      });
    });
  });
  describe('delete product route', function () {
    it('should return error for invalid id', function (done) {
      _chai.default.request(_app.default).delete('/api/v1/products/two').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error for non-existent id', function (done) {
      _chai.default.request(_app.default).delete('/api/v1/products/10000').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('attendant should not delete products', function (done) {
      _chai.default.request(_app.default).delete('/api/v1/products/4').set('Authorization', attendantToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('admin should be able to delete a product', function (done) {
      _chai.default.request(_app.default).delete('/api/v1/products/4').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('deletedProduct').that.is.an('object');
        done();
      });
    });
  });
});
//# sourceMappingURL=productController.spec.js.map