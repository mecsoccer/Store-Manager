import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {
  context('post requests for user sign-up', () => {
    it('Should post new user data', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .set('Authorization', 'Bearer admin')
        .send({
          username: 'Onyenze',
          password: 'attendant01',
        })
        .end((err, res) => {
          expect(err).to.be(null);
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

    it('should return error if not admin', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .set('Authorization', 'anonimous')
        .send({
          username: 'Onyenze',
          password: 'attendant01',
        })
        .end((err, res) => {
          expect(err).to.not.be(null);
          expect(res.data).to.be(null);
          expect(res.success).to.be(false);
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
});
