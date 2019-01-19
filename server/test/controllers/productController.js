import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('products', () => {
  context('#get requests for products', () => {
    it('Should return all available products', (done) => {
      chai.request(app)
        .get('/api/v1/products')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('should not return products that have run out of stock', (done) => {
      chai.request(app)
        .get('/api/v1/products/available')
        .end((err, res) => {
          done();
        });
    });

    it('Should return an existing product', (done) => {
      chai.request(app)
        .get('/api/v1/products/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('Should not return product for non-existent id', (done) => {
      chai.request(app)
        .get('/api/v1/products/20')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Sorry, product does not exist');
          done();
        });
    });
  });

  context('#post requests for products', () => {
    it('Should not post products to the store for non-admins', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .send({
          name: 'junk',
          category: 'provisions',
          'qty-left': 20,
          'qty-sold': 10,
          price: 800,
          'min-qty': 4,
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Sorry, accessible to admin only');
          expect(res).to.have.status(401);
          done();
        });
    });

    it('Should post products if admin', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', 'Bearer admin')
        .send({
          name: 'junk',
          category: 'provisions',
          'qty-left': 20,
          'qty-sold': 10,
          price: 800,
          'min-qty': 4,
        })
        .end((err, res) => {
          expect(res.body.newProduct).to.have.property('id');
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
