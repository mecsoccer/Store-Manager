import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from './mocks/userData';
import salesData from './mocks/salesData';

chai.use(chaiHttp);
const { expect } = chai;

const { admin, attendant } = userData;
const {
  exampleSale, wrongSellerName, wrongProductName, wrongQuantity, wrongPrice, wrongTotal,
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

  context('#get requests for sales', () => {
    it('Should not return sales record if not admin', (done) => {
      chai.request(app)
        .get('/api/v1/sales')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Sorry, accessible to admin only');
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

    it('Should return a single sale if admin', (done) => {
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

    it('Should return an existing sale if attendant', (done) => {
      chai.request(app)
        .get('/api/v1/sales/1')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Should not return sale for non-existent id', (done) => {
      chai.request(app)
        .get('/api/v1/sales/10000000')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('sorry, the sale record does not exist');
          done();
        });
    });
  });

  context('#post requests for sales', () => {
    it('should return 401 and error message if request has bad token', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', wrongToken)
        .send(exampleSale)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').that.equals('You must provide valid authorization');
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
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').that.equals('Sorry, accessible to store attendants only');
          done();
        });
    });

    it('respond with a 422 for invalid seller name', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send({ wrongSellerName })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
          expect(res.body).to.be.an('object').that.has.property('message');
          expect(res).to.have.status(422);
          done();
        });
    });

    it('respond with a 422 for invalid product name', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send({ wrongProductName })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
          expect(res.body).to.be.an('object').that.has.property('message');
          expect(res).to.have.status(422);
          done();
        });
    });

    it('respond with a 422 for invalid quantity', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send({ wrongQuantity })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
          expect(res.body).to.be.an('object').that.has.property('message');
          expect(res).to.have.status(422);
          done();
        });
    });

    it('respond with a 422 for invalid product price', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send({ wrongPrice })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
          expect(res.body).to.be.an('object').that.has.property('message');
          expect(res).to.have.status(422);
          done();
        });
    });

    it('respond with a 422 for invalid product total', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('Authorization', attendantToken)
        .send({ wrongTotal })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object').that.has.property('error').that.equals(true);
          expect(res.body).to.be.an('object').that.has.property('message');
          expect(res).to.have.status(422);
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
          expect(res.body).to.have.property('newSale');
          done();
        });
    });
  });
});
