import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('loginController', () => {
  context('post requests for login', () => {
    it('should authenticate user if user exists', (done) => {
      chai.request(app)
        .post('/auth/login')
        .set('Authorization', 'Bearer attendant')
        .type('form')
        .send({ username: 'onyenze', password: 'attendant01' })
        .end((err, res) => {
          expect(res).to.have.property('username');
          expect(res).to.have.property('password');
          expect(res).to.have.property('email');
          expect(res).to.have.property('productSold');
          expect(res).to.have.property('noOfSales');
          expect(res).to.have.property('worthOfSales');
        });
    });

    it('should return error message if inputs do not match any record', (done) => {
      chai.request(app)
        .post('/auth/login')
        .set('Authorization', 'Bearer attendant')
        .type('form')
        .send({ username: 'john doe', password: 'attendant' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.message).to.be.a('string');
          expect(res.data).to.be.null;
          done();
        });
    });
  });
});
