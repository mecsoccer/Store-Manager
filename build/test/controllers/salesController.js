'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _salesController = require('../../controllers/salesController');

var _salesController2 = _interopRequireDefault(_salesController);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var expect = _chai2.default.expect;
var getAll = _salesController2.default.getAll;

describe('sales', function () {
	context('#get requests for sales', function () {
		it('Should not return sales record if not admin', function (done) {
			_chai2.default.request(_app2.default).get('/api/v1/sales').end(function (err, res) {
				expect(res).to.have.status(401);
				expect(res.body.message).to.equal('Sorry, accessible to admin only');
				done();
			});
		});

		it('Should return sales record if admin', function (done) {
			_chai2.default.request(_app2.default).get('/api/v1/sales').set('Authorization', 'Bearer admin').end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				done();
			});
		});

		it('Should return an existing sale if admin', function (done) {
			_chai2.default.request(_app2.default).get('/api/v1/sales/1').set('Authorization', 'Bearer admin').end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				done();
			});
		});
		it('Should return an existing sale if attendant', function (done) {
			_chai2.default.request(_app2.default).get('/api/v1/sales/1').set('Authorization', 'Bearer attendant').end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				done();
			});
		});

		it('Should not return sale for non-existent id', function (done) {
			_chai2.default.request(_app2.default).get('/api/v1/sales/20').set('Authorization', 'Bearer admin').end(function (err, res) {
				expect(res).to.have.status(404);
				expect(res.body.message).to.equal('Sorry, the sale record does not exist');
				done();
			});
		});
	});

	context('#post requests for sales', function () {
		it('Should not post sales if not attendant', function (done) {
			_chai2.default.request(_app2.default).post('/api/v1/sales').send({
				attendant: 'Jaachimma',
				no_of_products: 200,
				worth_of_sales: 12000,
				details: [{ name: 'shoe', quantity: 2, price: 2000 }, { name: 'shoe', quantity: 2, price: 2000 }, { name: 'shoe', quantity: 2, price: 2000 }]
			}).end(function (err, res) {
				expect(res.body.message).to.equal('Sorry, accessible to attendant only');
				expect(res).to.have.status(401);
				done();
			});
		});

		it('Should post sales if attendant', function (done) {
			_chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', 'Bearer attendant').send({
				attendant: 'Jaachimma',
				no_of_products: 200,
				worth_of_sales: 12000,
				details: [{ name: 'shoe', quantity: 2, price: 2000 }, { name: 'shoe', quantity: 2, price: 2000 }, { name: 'shoe', quantity: 2, price: 2000 }]
			}).end(function (err, res) {
				expect(res.body.newRecord).to.have.property('id');
				expect(res).to.have.status(201);
				expect(res.body.message).to.equal('New record created');
				done();
			});
		});
	});
});
//# sourceMappingURL=salesController.js.map