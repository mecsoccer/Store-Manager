'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _userData = require('./mocks/userData');

var _userData2 = _interopRequireDefault(_userData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var expect = _chai2.default.expect;
var admin = _userData2.default.admin,
    attendant = _userData2.default.attendant,
    newAttendant = _userData2.default.newAttendant,
    emptyFields = _userData2.default.emptyFields,
    unknownUser = _userData2.default.unknownUser;


var adminToken = void 0;

describe('Users', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      adminToken = res.body.token;
      done();
    });
  });
  context('Add / signup a new store attendant', function () {
    it('Should add new attendant if data is correct', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(newAttendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        expect(res).to.be.an('object');
        expect(res.body.newAttendant.username).to.equal('Onyenze');
        expect(res.body.newAttendant.email).to.equal('addattendant@gmail.com');
        done();
      });
    });

    it('should return error if not admin', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/auth/signup').set('Authorization', 'anonimous').send({ newAttendant: newAttendant }).end(function (err, res) {
        expect(res.body.data).to.equal(undefined);
        expect(res.body.success).to.equal(false);
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('should return 422 error if admin has supplied unacceptable username or password', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/auth/signup').set('Authorization', '3toremana8a').end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.be.a('string').that.equals('Username or password incorrect');
        done();
      });
    });
  });

  context('Tests for Login route', function () {
    it('should return a 422 if username or password fields are empty', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(emptyFields).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal(true);
        expect(res.body.message).to.equal('username and password fields must not be empty');
        done();
      });
    });

    it('should return a 401 for wrong username or password', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(unknownUser).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal(true);
        expect(res.body.message).to.equal('sorry username and password have no match');
        done();
      });
    });

    it('should return username and token for correct data', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.be.a('string');
        expect(res.body.token).to.be.a('string');
        done();
      });
    });
  });
});
//# sourceMappingURL=userController.js.map