const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel, saleByIdFromDB, saleByIdFromModel, saleFromModel, saleIdFromDB } = require('../mocks/sales.mock');

describe('Sales Model Test', function () {
  describe('GET endpoint', function () {
    it('Can find all sales', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesFromDB]);

      const sales = await salesModel.findAllSales();

      expect(sales).to.be.an('array');
      expect(sales).to.be.deep.equal(allSalesFromModel);
    });

    it('Can find a sale by id', async function () {
      sinon.stub(connection, 'execute').resolves([saleByIdFromDB]);

      const inputData = 42;
      const sale = await salesModel.findSaleById(inputData);

      expect(sale).to.be.an('array');
      expect(sale).to.be.deep.equal(saleByIdFromModel);
    });
  });

  describe('POST endpoint', function () {
    it('Can register a new sale', async function () {
      sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([saleIdFromDB])
      .onSecondCall()
      .resolves(null);

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
      const registeredSale = await salesModel.registerSale(inputData);

      expect(registeredSale).to.be.an('object');
      expect(registeredSale).to.be.deep.equal(saleFromModel);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});