import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mocks from './mocks/userData';

const { expect } = chai;

const {
  admin, attendant, newAttendant, updateAttendant, emptyFields, unknownUser,
} = mocks;

chai.use(chaiHttp);

let adminToken;
let attendantToken;

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(attendant)
      .end((err, res) => {
        attendantToken = res.body.token;
        done();
      });
  });

  describe('Tests for Login route', () => {
    /*
    it('should return a 422 if username or password fields are empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emptyFields)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal(true);
          expect(res.body.message).to.equal('username and password fields must not be empty');
          done();
        });
    });
    */

    /*
    it('should return a 401 for wrong username or password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(unknownUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
    */

    it('should return username and token for correct data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(admin)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.body.role).to.be.a('string');
          done();
        });
    });
  });

  describe('Add / signup a new store attendant', () => {
    it('Should add new attendant if data is correct', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', adminToken)
        .send(newAttendant)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('newAttendant');
          done();
        });
    });

    /*
    it('should return a 401 and error message if not admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', attendantToken)
        .send(newAttendant)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
    */
  });

  describe('Get route for users', () => {
    it('# should get all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('allUsers').that.is.an('array');
          done();
        });
    });

    it('# should get a single user', (done) => {
      chai.request(app)
        .get('/api/v1/users/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('user').that.is.an('object');
          done();
        });
    });

    it('# should return error for non-existent id', (done) => {
      chai.request(app)
        .get('/api/v1/users/899j9')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });
});
