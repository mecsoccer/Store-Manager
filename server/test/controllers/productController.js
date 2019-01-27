import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from './mocks/userData';
import productData from './mocks/productData';

chai.use(chaiHttp);
const { expect } = chai;

const { admin, attendant } = userData;
const { exampleProduct } = productData;

let adminToken;
let attendantToken;

describe('products', () => {
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

  context('#get requests for products', () => {
    it('Should return all products', (done) => {
      chai.request(app)
        .get('/api/v1/products')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('allProducts').that.is.an('array').that.has.length.greaterThan(0);
          done();
        });
    });

    it('Should return all available products', (done) => {
      chai.request(app)
        .get('/api/v1/products/available')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('availableProducts').that.is.an('array').that.has.length.greaterThan(0);
          done();
        });
    });

    it('Should return an existing product', (done) => {
      chai.request(app)
        .get('/api/v1/products/1')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('product').that.is.an('object').that.has.property('id');
          done();
        });
    });

    it('Should not return product for non-existent id', (done) => {
      chai.request(app)
        .get('/api/v1/products/20')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('sorry, product does not exist');
          done();
        });
    });
  });

  context('#post requests for products', () => {
    it('attendants should not add products to the store', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', attendantToken)
        .send({ exampleProduct })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Sorry, accessible to admin only');
          done();
        });
    });

    /*
    it('admin should add products to the store', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send({ exampleProduct })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(201);
          expect(res.body.newProduct).to.have.property('id');
          done();
        });
    }); */
  });
});
