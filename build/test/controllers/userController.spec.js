"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _userData = _interopRequireDefault(require("./mocks/userData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;
var admin = _userData.default.admin,
    attendant = _userData.default.attendant,
    newAttendant = _userData.default.newAttendant,
    updateAttendant = _userData.default.updateAttendant,
    invalidUsername = _userData.default.invalidUsername,
    unknownUser = _userData.default.unknownUser,
    invalidNewUsername = _userData.default.invalidNewUsername,
    invalidPasswordFormat = _userData.default.invalidPasswordFormat,
    invalidNewEmail = _userData.default.invalidNewEmail,
    invalidSignupRole = _userData.default.invalidSignupRole,
    invalidNewPassword = _userData.default.invalidNewPassword;

_chai.default.use(_chaiHttp.default);

var adminToken;
var attendantToken;
describe('Users', function () {
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
  describe('Tests for Login route', function () {
    it('should return a 422 for invalid username', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(invalidUsername).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return a 422 for invalid password', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(invalidPasswordFormat).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return a 401 for wrong username or password', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(unknownUser).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    it('should return username and token for attendant', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.be.a('string');
        expect(res.body.token).to.be.a('string');
        expect(res.body.role).to.be.a('string');
        done();
      });
    });
    it('should return username and token for admin', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.be.a('string');
        expect(res.body.token).to.be.a('string');
        expect(res.body.role).to.be.a('string');
        done();
      });
    });
  });
  describe('Add / signup a new store attendant', function () {
    it('should return error message if non-admin tries to access admin route', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', attendantToken).send({}).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('Should add new attendant if data is correct', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(newAttendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('newAttendant');
        done();
      });
    });
    it('Should return error if username already exists', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(newAttendant).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error for empty object', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send({}).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return error for invalid username', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(invalidNewUsername).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return a 422 for invalid password format', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(invalidNewPassword).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return a 422 for invalid email', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(invalidNewEmail).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
    it('should return a 422 for invalid role', function (done) {
      _chai.default.request(_app.default).post('/api/v1/auth/signup').set('Authorization', adminToken).send(invalidSignupRole).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
  describe('Get route for users', function () {
    it('# should get all users', function (done) {
      _chai.default.request(_app.default).get('/api/v1/users').set('Authorization', adminToken).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('allUsers').that.is.an('array');
        done();
      });
    });
    it('# should get a single user', function (done) {
      _chai.default.request(_app.default).get('/api/v1/users/1').set('Authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('user').that.is.an('object');
        done();
      });
    });
    it('# should return error for non-existent id', function (done) {
      _chai.default.request(_app.default).get('/api/v1/users/899j9').set('Authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
  describe('Tests for update routes', function () {
    it('# should update user personal data', function (done) {
      _chai.default.request(_app.default).put('/api/v1/users/4').set('Authorization', adminToken).send(updateAttendant).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('updatedUser');
        expect(res.body.updatedUser).to.be.an('object');
        done();
      });
    });
    it('# should give admin right to attendant', function (done) {
      _chai.default.request(_app.default).put('/api/v1/users/authorization/4').set('Authorization', adminToken).send({
        admin: true
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('newAdmin');
        expect(res.body.newAdmin).to.be.an('object');
        done();
      });
    });
    it('# should return error for admin right of non-existent id', function (done) {
      _chai.default.request(_app.default).put('/api/v1/users/authorization/300000000').set('Authorization', adminToken).send({
        admin: true
      }).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    it('# should return error if id does not exist', function (done) {
      _chai.default.request(_app.default).put('/api/v1/users/123abc').set('Authorization', adminToken).send(updateAttendant).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    it('# should return error for invalid user name', function (done) {
      _chai.default.request(_app.default).put('/api/v1/users/2').set('Authorization', adminToken).send(invalidNewUsername).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
  describe('Tests for user delete route', function () {
    it('# should delete user', function (done) {
      _chai.default.request(_app.default).delete('/api/v1/users/4').set('Authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('deletedUser');
        expect(res.body.deletedUser).to.be.an('object');
        done();
      });
    });
    it('# should return error if record does not exist', function (done) {
      _chai.default.request(_app.default).delete('/api/v1/users/123abc').set('Authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
});
//# sourceMappingURL=userController.spec.js.map