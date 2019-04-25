import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mocks from './mocks/userData';

const { expect } = chai;

const {
  admin, attendant, newAttendant,
  updateAttendant, emptyFields, unknownUser,
  invalidUserData,
} = mocks;

chai.use(chaiHttp);

let adminToken;

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  describe('Tests for Login route', () => {
    it('should return a 422 for invalid username or password fields', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emptyFields)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

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

    it('should return username and token for attendant', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(attendant)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.body.role).to.be.a('string');
          done();
        });
    });

    it('should return username and token for admin', (done) => {
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

    it('Should return error if username already exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', adminToken)
        .send(newAttendant)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return error for empty object', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', adminToken)
        .send({})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return error for invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', adminToken)
        .send(invalidUserData)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
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

  describe('Tests for update routes', () => {
    it ('# should update user personal data', (done) => {
      chai.request(app)
        .put('/api/v1/users/2')
        .set('Authorization', adminToken)
        .send(updateAttendant)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('updatedUser');
          expect(res.body.updatedUser).to.be.an('object');
          done();
        });
    });

    it ('# should give admin right to attendant', (done) => {
      chai.request(app)
        .put('/api/v1/users/authorization/4')
        .set('Authorization', adminToken)
        .send({ admin: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('newAdmin');
          expect(res.body.newAdmin).to.be.an('object');
          done();
        });
    });

    it ('# should return error for admin right of non-existent id', (done) => {
      chai.request(app)
        .put('/api/v1/users/authorization/300000000')
        .set('Authorization', adminToken)
        .send({ admin: true })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it ('# should return error if id does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/users/123abc')
        .set('Authorization', adminToken)
        .send(updateAttendant)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it ('# should return error for invalid user data', (done) => {
      chai.request(app)
        .put('/api/v1/users/2')
        .set('Authorization', adminToken)
        .send(invalidUserData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });

  describe('Tests for user delete route', () => {
    it ('# should delete user', (done) => {
      chai.request(app)
        .delete('/api/v1/users/4')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('deletedUser');
          expect(res.body.deletedUser).to.be.an('object');
          done();
        });
    });

    it ('# should return error if record does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/users/123abc')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });
});
