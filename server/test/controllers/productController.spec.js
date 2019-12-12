import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from './mocks/userData';
import productData from './mocks/productData';

chai.use(chaiHttp);
const { expect } = chai;

const { admin, attendant } = userData;
const {
  exampleProduct,
  invalidProductName, invalidProductCategory, invalidProductPrice, invalidProductLeft,
  invalidProductSold, invalidMinQuantity, invalidQuantitySold, invalidProductDetails,
  updateQuantitySold, updateProductDetails,
} = productData;

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

  describe('get requests for products', () => {
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

    it('Should return all finished products', (done) => {
      chai.request(app)
        .get('/api/v1/products/finished')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('finishedProducts').that.is.an('array').that.has.length.greaterThan(0);
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

    it('Should not return product for invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/products/ten')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('Should return error for non-existent id', (done) => {
      chai.request(app)
        .get('/api/v1/products/10000')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('post requests for products', () => {
    it('attendant should not add products to the store', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', attendantToken)
        .send(exampleProduct)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('product name should follow a format', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(invalidProductName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('product category should follow a format', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(invalidProductCategory)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('product price should follow a format', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(invalidProductPrice)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('product quantity left should follow a format', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(invalidProductLeft)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('product quantity sold should follow a format', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(invalidProductSold)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('product min. quantity should follow a format', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(invalidMinQuantity)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('admin should add products to the store', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(exampleProduct)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(201);
          expect(res.body.newProduct).to.have.property('id');
          done();
        });
    });

    it('product name should be unique', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', adminToken)
        .send(exampleProduct)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('Update products', () => {
    it('product details should follow the correct format', (done) => {
      chai.request(app)
        .put('/api/v1/products/details/3')
        .set('Authorization', adminToken)
        .send(invalidProductDetails)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return error for non-existent product id while updating details', (done) => {
      chai.request(app)
        .put('/api/v1/products/details/10000')
        .set('Authorization', adminToken)
        .send(updateProductDetails)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('attendant should not update product details', (done) => {
      chai.request(app)
        .put('/api/v1/products/details/3')
        .set('Authorization', attendantToken)
        .send(updateProductDetails)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error').that.is.an('string');
          done();
        });
    });

    it('admin should update product details', (done) => {
      chai.request(app)
        .put('/api/v1/products/details/3')
        .set('Authorization', adminToken)
        .send(updateProductDetails)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('updatedProduct').that.is.an('object');
          done();
        });
    });

    it('quantity sold should follow the correct format', (done) => {
      chai.request(app)
        .put('/api/v1/products/quantity-sold/3')
        .set('Authorization', attendantToken)
        .send(invalidQuantitySold)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.an('string');
          done();
        });
    });

    it('should return error for non-existent id while updating quantiy sold', (done) => {
      chai.request(app)
        .put('/api/v1/products/quantity-sold/100000')
        .set('Authorization', attendantToken)
        .send(updateQuantitySold)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.an('string');
          done();
        });
    });

    it('admin should not update quantity sold', (done) => {
      chai.request(app)
        .put('/api/v1/products/quantity-sold/3')
        .set('Authorization', adminToken)
        .send(updateQuantitySold)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error').that.is.an('string');
          done();
        });
    });

    it('attendant should update quantity sold', (done) => {
      chai.request(app)
        .put('/api/v1/products/quantity-sold/3')
        .set('Authorization', attendantToken)
        .send(updateQuantitySold)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('updatedProduct').that.is.an('object');
          done();
        });
    });
  });

  describe('delete product route', () => {
    it('should return error for invalid id', (done) => {
      chai.request(app)
        .delete('/api/v1/products/two')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return error for non-existent id', (done) => {
      chai.request(app)
        .delete('/api/v1/products/10000')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('attendant should not delete products', (done) => {
      chai.request(app)
        .delete('/api/v1/products/4')
        .set('Authorization', attendantToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    /*
    it('admin should be able to delete a product', (done) => {
      chai.request(app)
        .delete('/api/v1/products/4')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('deletedProduct').that.is.an('object');
          done();
        });
    });
    */
  });
});
