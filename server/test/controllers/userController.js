import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import addAttendant from '../../controllers/userController';

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
          email: 'addAttendant@mail.com',
        })
        .end((err, res) => {
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
          expect(res.data).to.equal(null);
          expect(res.success).to.equal(false);
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should return 422 error if admin has not supplied any username or password', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .set('Authorization', 'Bearer admin')
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.message).t0.be.a('string').that.equals('Username and password are required');
          done();
        });
    });
  });
});
