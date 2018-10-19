'use strict';

var _productController = require('../../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var expect = _chai2.default.expect;
var getAll = _productController2.default.getAll;

describe('products', function () {

	it('Should return products', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/products').end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res).to.be.an('object');
			done();
		});
	});
});
//# sourceMappingURL=productController.js.map