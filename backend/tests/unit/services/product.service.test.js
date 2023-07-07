const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProductsFromDB, allProductsFromModel, productByIdFromDB, productByIdFromModel, productIdFromDB, updatedProductByIdFromModel, updatedProductByIdFromDB } = require('../mocks/product.mock');

describe('Product Service Test', function () {
  describe('GET endpoint', function () {
    it('Can successfully get all products', async function () {
      sinon.stub(productModel, 'findAllProducts').resolves(allProductsFromDB);

      const serviceResponse = await productService.getAllProducts();

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(allProductsFromModel);
    });

    it('Can successfully get a product by id', async function () {
      sinon.stub(productModel, 'findProductById').resolves(productByIdFromDB);

      const inputData = 42;
      const serviceResponse = await productService.getProductById(inputData);

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(productByIdFromModel);
    });

    it('Returns status NOT_FOUND when can not get product by id ', async function () {
      sinon.stub(productModel, 'findProductById').resolves(undefined);

      const inputData = 99;
      const serviceResponse = await productService.getProductById(inputData);

      expect(serviceResponse.status).to.equal('NOT_FOUND');
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  describe('POST endpoint', function () {
    it('Can successfully insert a new product', async function () {
      sinon.stub(productModel, 'insertProduct').resolves(productIdFromDB);
      sinon.stub(productModel, 'findProductById').resolves(productByIdFromDB);

      const inputData = {
        name: 'ProdutoXX',
      };
      const serviceResponse = await productService.insertNewProduct(inputData);

      expect(serviceResponse.status).to.equal('CREATED');
      expect(serviceResponse.data).to.be.deep.equal(productByIdFromModel);
    });

    it('Returns status INVALID_VALUE when insertion product name length < 5', async function () {
      const inputData = {
        name: 'aaa',
      };
      const serviceResponse = await productService.insertNewProduct(inputData);

      expect(serviceResponse.status).to.equal('INVALID_VALUE');
      expect(serviceResponse.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('PUT endpoint', function () {
    it('Can successfully update a name product', async function () {
      sinon.stub(productModel, 'findProductById')
      .onFirstCall()
      .resolves(productByIdFromDB)
      .onSecondCall()
      .resolves(updatedProductByIdFromDB);
      sinon.stub(productModel, 'updateProduct').resolves(null);

      const inputData = {
        name: 'Martelo do Batman',
      };
      const inputId = 42;
      const serviceResponse = await productService.updateProductInfo(inputId, inputData);

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(updatedProductByIdFromModel);
    });

    it('Returns status INVALID_VALUE when product name length < 5', async function () {
      const inputData = {
        name: 'aaa',
      };
      const inputId = 42;

      const serviceResponse = await productService.updateProductInfo(inputId, inputData);

      expect(serviceResponse.status).to.equal('INVALID_VALUE');
      expect(serviceResponse.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });

    it('Returns status NOT_FOUND when non-existent product id', async function () {
      sinon.stub(productModel, 'findProductById')
      .onFirstCall()
      .resolves(undefined);

      const inputData = {
        name: 'Martelo do Batman',
      };
      const inputId = 99;

      const serviceResponse = await productService.updateProductInfo(inputId, inputData);

      expect(serviceResponse.status).to.equal('NOT_FOUND');
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  describe('DELETE endpoint', function () {
    it('Returns status NOT_FOUND when non-existent product id', async function () {
      sinon.stub(productModel, 'findProductById').resolves(productByIdFromDB);
      sinon.stub(productModel, 'deleteProduct').resolves(null);

      const inputId = 42;
      const serviceResponse = await productService.deleteProductById(inputId);

      expect(serviceResponse.status).to.equal('NO_CONTENT');
    });

    it('Can successfully delete a product', async function () {
      sinon.stub(productModel, 'findProductById').resolves(undefined);

      const inputId = 99;
      const serviceResponse = await productService.deleteProductById(inputId);

      expect(serviceResponse.status).to.equal('NOT_FOUND');
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});