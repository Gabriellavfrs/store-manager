const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProductsFromDB, allProductsFromModel, productByIdFromDB, productByIdFromModel, productIdFromDB } = require('../mocks/product.mock');

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

  it('Return status INVALID_VALUE when insertion product name length < 5', async function () {
    const inputData = {
      name: 'aaa',
    };
    const serviceResponse = await productService.insertNewProduct(inputData);

    expect(serviceResponse.status).to.equal('INVALID_VALUE');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    sinon.restore();
  });
});