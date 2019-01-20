'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var expect = _chai2.default.expect;


describe('products', function () {
  context('#get requests for products', function () {
    it('Should return all available products', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/products').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });

    it('should not return products that have run out of stock', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/products/available').end(function (err, res) {
        done();
      });
    });

    it('Should return an existing product', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/products/1').end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });

    it('Should not return product for non-existent id', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/products/20').end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Sorry, product does not exist');
        done();
      });
    });
  });

  context('#post requests for products', function () {
    it('Should not post products to the store for non-admins', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/products').send({
        name: 'junk',
        category: 'provisions',
        'qty-left': 20,
        'qty-sold': 10,
        price: 800,
        'min-qty': 4
      }).end(function (err, res) {
        expect(res.body.message).to.equal('Sorry, accessible to admin only');
        expect(res).to.have.status(401);
        done();
      });
    });

    it('Should post products if admin', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/products').set('Authorization', 'Bearer admin').send({
        name: 'junk',
        category: 'provisions',
        'qty-left': 20,
        'qty-sold': 10,
        price: 800,
        'min-qty': 4
      }).end(function (err, res) {
        expect(res.body.newProduct).to.have.property('id');
        expect(res).to.have.status(201);
        done();
      });
    });
  });
});
//# sourceMappingURL=productController.js.map