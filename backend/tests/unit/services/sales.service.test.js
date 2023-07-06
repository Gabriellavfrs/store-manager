const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel, saleByIdFromDB, saleByIdFromModel, saleFromModel } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

describe('Sales Service Test', function () {
  describe('GET endpoint', function () {
    it('Can successfully get all sales', async function () {
      sinon.stub(salesModel, 'findAllSales').resolves(allSalesFromDB);

      const serviceResponse = await salesService.getAllSales();

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(allSalesFromModel);
    });

    it('Can successfully get a sale by id', async function () {
      sinon.stub(salesModel, 'findSaleById').resolves(saleByIdFromDB);

      const inputData = 2;
      const serviceResponse = await salesService.getSaleById(inputData);

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(saleByIdFromModel);
    });

    it('Returns status NOT_FOUND when can not get product by id ', async function () {
      sinon.stub(salesModel, 'findSaleById').resolves([]);

      const inputData = 99;
      const serviceResponse = await salesService.getSaleById(inputData);

      expect(serviceResponse.status).to.equal('NOT_FOUND');
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('POST endpoint', function () {
    it('Can successfully regiser a new sale', async function () {
      sinon.stub(salesModel, 'registerSale').resolves(saleFromModel);
  
      const inputData = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      const serviceResponse = await salesService.insertNewSale(inputData);
  
      expect(serviceResponse.status).to.equal('CREATED');
      expect(serviceResponse.data).to.be.deep.equal(saleFromModel);
    });

    it('Returns status INVALID_VALUE when product quantity < 1 ', async function () {
      const inputData = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 0,
        },
      ];
      const serviceResponse = await salesService.insertNewSale(inputData);
  
      expect(serviceResponse.status).to.equal('INVALID_VALUE');
      expect(serviceResponse.data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Returns status NOT_FOUND when non-existent product id ', async function () {
      const inputData = [
        {
          productId: 99,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      const serviceResponse = await salesService.insertNewSale(inputData);
  
      expect(serviceResponse.status).to.equal('NOT_FOUND');
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});