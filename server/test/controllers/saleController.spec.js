import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from './mocks/userData';
import salesData from './mocks/saleData';

chai.use(chaiHttp);
const { expect } = chai;

const { admin, attendant } = userData;
const {
  exampleSale, wrongSellerName, wrongProductName, wrongQuantity, wrongPrice, wrongTotal,
  omittedField, zeroQuantity, longSellerName,
} = salesData;

const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphYWNoaWRvIiwicGFzc3dvcmQiOiIwNjM4NDU3OWhmIiwiaWF0IjoxNTQ3MDY4NzY2LCJleHAiOjE1NDcwNzIzNjZ9._L0BF4aCsGWU9jRJF8lsuu9_WLKyvEGpMJbn1KgSmSM';

let adminToken;
let attendantToken;

describe('Tests for sales', () => {
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

  describe('get requests for sales', () => {
    it('Should return error if not admin', (done) => {
      chai.request(app)
        .get('/api/v1/sales')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('Should return sales record if user is admin', (done) => {
      chai.request(app)
        .get('/api/v1/sales')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('Should return a single sale if user is admin or the seller', (done) => {
      chai.request(app)
        .get('/api/v1/sales/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Should return error for non-existent id', (done) => {
      chai.request(app)
        .get('/api/v1/sales/100000')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('Should return error for invalid sale id', (done) => {
      chai.request(app)
        .get('/api/v1/sales/ten')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('post requests for sales', () => {
    it('should return error message if non-attendant tries to access attendant route', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', adminToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return error message if diffent attendant tries to access seller only route', (done) => {
      chai.request(app)
        .get('/api/v1/sales/1')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return 401 and error message if request has bad token', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', wrongToken)
        .send(exampleSale)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return 401 and error message if user is admin', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', adminToken)
        .send(exampleSale)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return error if a required field is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(omittedField)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('should respond with a 422 for invalid seller name', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(wrongSellerName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('should respond with error for seller name too long', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(longSellerName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('respond with a 422 for invalid product name', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(wrongProductName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('respond with a 422 for invalid quantity', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(wrongQuantity)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('respond with a 422 for zero quantity', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(zeroQuantity)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('respond with a 422 for invalid product price', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(wrongPrice)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('respond with a 422 for invalid product total', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(wrongTotal)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('object').that.has.property('error').that.is.a('string');
          done();
        });
    });

    it('should create sale record for attendant if data is valid', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send(exampleSale)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object').that.has.property('newSale').that.is.an('object');
          done();
        });
    });
  });
});
