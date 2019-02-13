"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _userData = _interopRequireDefault(require("./mocks/userData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect;
var admin = _userData.default.admin,
    attendant = _userData.default.attendant,
    newAttendant = _userData.default.newAttendant,
    emptyFields = _userData.default.emptyFields,
    unknownUser = _userData.default.unknownUser;
var adminToken;
var attendantToken;
describe('Users', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      adminToken = res.body.token;
    });

    _chai.default.request(_app.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      attendantToken = res.body.token;
      done();
    });
  });
  describe('Tests for Login route', function () {
    it('should return a 422 if username or password fields are empty', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(emptyFields).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal(true);
        expect(res.body.message).to.equal('username and password fields must not be empty');
        done();
      });
    });
    it('should return a 401 for wrong username or password', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(unknownUser).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal(true);
        expect(res.body.message).to.equal('user does not exist');
        done();
      });
    });
    it('should return username and token for correct data', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.be.a('string');
        expect(res.body.token).to.be.a('string');
        done();
      });
    });
  });
  describe('Add / signup a new store attendant', function () {
    it('Should add new attendant if data is correct', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(newAttendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('newAttendant');
        done();
      });
    });
    it('should return a 401 and error message if not admin', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', attendantToken).send(newAttendant).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Sorry, accessible to admin only');
        done();
      });
    });
  });
});
//# sourceMappingURL=userController.js.map