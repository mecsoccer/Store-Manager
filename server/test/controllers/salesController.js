import chai from 'chai';
import chaiHttp from 'chai-http';
import get from '../../controllers/salesController';
import app from '../../../app';

chai.use(chaiHttp);

const expect = chai.expect;
const getAll = get.getAll;

describe('sales', () => {
  context('#get requests for sales', () => {
    it('Should not return sales record if not admin', (done) => {
      chai.request(app)
			  .get('/api/v1/sales')
			  .end((err, res) => {
				  expect(res).to.have.status(401);
				  expect(res.body.message).to.equal('Sorry, accessible to admin only');
				  done();
			  });
    });

    it('Should return sales record if admin', (done) => {
      chai.request(app)
			  .get('/api/v1/sales')
			  .set('Authorization', 'Bearer admin')
			  .end((err, res) => {
				  expect(err).to.be.null;
				  expect(res).to.have.status(200);
				  expect(res).to.be.an('object');
				  done();
			  });
    });

    it('Should return an existing sale if admin', (done) => {
      chai.request(app)
			  .get('/api/v1/sales/1')
			  .set('Authorization', 'Bearer admin')
			  .end((err, res) => {
				  expect(err).to.be.null;
				  expect(res).to.have.status(200);
				  expect(res).to.be.an('object');
				  done();
			  });
    });
    it('Should return an existing sale if attendant', (done) => {
      chai.request(app)
			  .get('/api/v1/sales/1')
			  .set('Authorization', 'Bearer attendant')
			  .end((err, res) => {
				  expect(err).to.be.null;
				  expect(res).to.have.status(200);
				  expect(res).to.be.an('object');
				  done();
			  });
    });

    it('Should not return sale for non-existent id', (done) => {
      chai.request(app)
			  .get('/api/v1/sales/20')
			  .set('Authorization', 'Bearer admin')
			  .end((err, res) => {
				  expect(res).to.have.status(404);
				  expect(res.body.message).to.equal('Sorry, the sale record does not exist');
				  done();
			  });
    });
  });

  context('#post requests for sales', () => {
    it('Should not post sales if not attendant', (done) => {
      chai.request(app)
			  .post('/api/v1/sales')
			  .send({
          attendant: 'Jaachimma',
          no_of_products: 200,
          worth_of_sales: 12000,
          details: [
									 { name: 'shoe', quantity: 2, price: 2000 },
									 { name: 'shoe', quantity: 2, price: 2000 },
									 { name: 'shoe', quantity: 2, price: 2000 },
								   ],
			  })
			  .end((err, res) => {
				  expect(res.body.message).to.equal('Sorry, accessible to attendant only');
				  expect(res).to.have.status(401);
				  done();
			  });
    });

    it('Should post sales if attendant', (done) => {
      chai.request(app)
			  .post('/api/v1/sales')
			  .set('Authorization', 'Bearer attendant')
			  .send({
					  attendant: 'Jaachimma',
					  no_of_products: 200,
					  worth_of_sales: 12000,
					  details: [
								 { name: 'shoe', quantity: 2, price: 2000 },
								 { name: 'shoe', quantity: 2, price: 2000 },
								 { name: 'shoe', quantity: 2, price: 2000 },
							   ],
			  })
			  .end((err, res) => {
				  expect(res.body.newRecord).to.have.property('id');
				  expect(res).to.have.status(201);
				  expect(res.body.message).to.equal('New record created');
				  done();
			  });
    });
  });
});
