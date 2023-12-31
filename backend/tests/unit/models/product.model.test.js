const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { allProductsFromDB, allProductsFromModel, productByIdFromDB, productByIdFromModel, productIdFromDB, productIdFromModel } = require('../mocks/product.mock');

describe('Product Model Test', function () {
  describe('GET endpoint', function () {
    it('Can find all products', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsFromDB]);

      const products = await productModel.findAllProducts();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(allProductsFromModel);
    });

    it('Can find a product by id', async function () {
      sinon.stub(connection, 'execute').resolves([[productByIdFromDB]]);

      const inputData = 42;
      const products = await productModel.findProductById(inputData);

      expect(products).to.be.an('object');
      expect(products).to.be.deep.equal(productByIdFromModel);
    });
  });
  describe('POST endpoint', function () {
    it('Can insert a new product', async function () {
      sinon.stub(connection, 'execute').resolves([productIdFromDB]);

      const inputData = {
        name: 'ProdutoX',
      };
      const insertId = await productModel.insertProduct(inputData);

      expect(insertId).to.be.an('number');
      expect(insertId).to.be.deep.equal(productIdFromModel);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});