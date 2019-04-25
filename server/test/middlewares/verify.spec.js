import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../controllers/mocks/userData';

const { expect } = chai;

chai.use(chaiHttp);

const { admin, attendant } = users;

let adminToken;
let attendantToken;

describe('Tests for authentication middleware', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(attendant)
      .end((err, res) => {
        attendantToken = res.body.token;
        done();
      });
  });

  describe('Tests for no token or bad token cases', () => {
    it('should return error message if no token', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .send({})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('should return error message if token is blank', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', '')
        .send({})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('should return error message if token is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphYWNoaWRvIiwicGFzc3dvcmQiOiIwNjM4NDU3OWhmIiwiaWF0IjoxNTQ3MDY4NzY2LCJleHAiOjE1NDcwNzIzNjZ9._L0BF4aCsGWU9jRJF8lsuu9_WLKyvEGpMJbn1KgSmSM')
        .send({})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('Tests for accessibility', () => {
    it('should return error message if non-admin tries to access admin route', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', attendantToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('should return error message if non-attendant tries to access attendant route', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', adminToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('should return error message if diffent attendant tries to access seller only route', (done) => {
      chai.request(app)
        .get('/api/v1/sales/3')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });
});
