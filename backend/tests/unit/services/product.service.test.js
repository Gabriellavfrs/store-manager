const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProductsFromDB, allProductsFromModel, productByIdFromDB, productByIdFromModel } = require('../mocks/product.model.mock');

describe('Service Test', function () {
  it('Can successfully get all products', async function () {
    sinon.stub(productModel, 'findAllProducts').resolves(allProductsFromDB);

    const serviceResponse = await productService.getAllProducts();

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(allProductsFromModel);
  });

  it('return status NOT_FOUND when can not get all products ', async function () {
    sinon.stub(productModel, 'findAllProducts').resolves([]);

    const serviceResponse = await productService.getAllProducts();

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'There are no products' });
  });

  it('Can successfully get a product by id', async function () {
    sinon.stub(productModel, 'findProductById').resolves(productByIdFromDB);

    const inputData = 2;
    const serviceResponse = await productService.getProductById(inputData);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(productByIdFromModel);
  });

  it('return status NOT_FOUND when can not get product by id ', async function () {
    sinon.stub(productModel, 'findProductById').resolves(undefined);

    const inputData = 4;
    const serviceResponse = await productService.getProductById(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});