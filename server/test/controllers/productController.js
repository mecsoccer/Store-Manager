import get from '../../controllers/productController';
import app from '../../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;
const getAll = get.getAll;

describe('products', function(){
	
	it('Should return products', function(done){
		chai.request(app)
		  .get('/api/v1/products')
		  .end((err, res) => {
			  expect(err).to.be.null
			  expect(res).to.have.status(200)
			  expect(res).to.be.an('object')
			  done()
		  })
	})
	
})