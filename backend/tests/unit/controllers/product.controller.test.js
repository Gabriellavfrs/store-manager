const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { allproductsFromServiceSuccess, allProductsFromModel, productByIdFromServiceSuccess, productByIdFromModel, productByIdFromServiceNotFound } = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');

describe('Product Controller Test', function () {
  describe('GET endpoint', function () {
    it('Successfully receives all Products', async function () {
      sinon.stub(productService, 'getAllProducts').resolves(allproductsFromServiceSuccess);
    
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    
      await productController.allProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsFromModel);
    });

    it('Successfully receives a products by id', async function () {
      sinon.stub(productService, 'getProductById').resolves(productByIdFromServiceSuccess);
    
      const req = {
        params: { id: 42 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    
      await productController.productById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productByIdFromModel);
    });

    it('Receives status 404 when non-existent id', async function () {
      sinon.stub(productService, 'getProductById').resolves(productByIdFromServiceNotFound);
    
      const req = {
        params: { id: 99 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    
      await productController.productById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'message' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});