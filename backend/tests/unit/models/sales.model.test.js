const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel, saleByIdFromDB, saleByIdFromModel } = require('../mocks/sales.mock');

describe('Sales Model Test', function () {
  it('Can find all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);

    const sales = await salesModel.findAllSales();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(allSalesFromModel);
  });

  it('Can find a sale by id', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdFromDB]);

    const inputData = 2;
    const sale = await salesModel.findSaleById(inputData);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleByIdFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});