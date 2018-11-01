'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

var _userController = require('../../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var expect = _chai2.default.expect;


describe('Users', function () {
  context('post requests for user sign-up', function () {
    it('Should post new user data', function (done) {
      _chai2.default.request(_app2.default).post('/auth/signup').set('Authorization', 'Bearer admin').send({
        username: 'Onyenze',
        password: 'attendant01',
        email: 'addAttendant@mail.com'
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.an('object');
        expect(res.name).to.equal('Onyenze');
        expect(res.email).to.be.a('string').that.includes('@');
        expect(res.productSold).to.be.a('number').that.equals(0);
        expect(res.noOfSales).to.be.a('number').that.equals(0);
        expect(res.worthOfSales).to.be.a('number').that.equals(0);
        done();
      });
    });

    it('should return error if not admin', function (done) {
      _chai2.default.request(_app2.default).post('/auth/signup').set('Authorization', 'anonimous').send({
        username: 'Onyenze',
        password: 'attendant01'
      }).end(function (err, res) {
        expect(res.data).to.equal(null);
        expect(res.success).to.equal(false);
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('should return 422 error if admin has not supplied any username or password', function (done) {
      _chai2.default.request(_app2.default).post('/auth/signup').set('Authorization', 'Bearer admin').end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.message).t0.be.a('string').that.equals('Username and password are required');
        done();
      });
    });
  });
});
//# sourceMappingURL=userController.js.map