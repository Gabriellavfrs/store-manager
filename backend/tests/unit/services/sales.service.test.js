const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel, saleByIdFromDB, saleByIdFromModel } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

describe('Sales Service Test', function () {
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

  it('Return status NOT_FOUND when can not get product by id ', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([]);

    const inputData = 99;
    const serviceResponse = await salesService.getSaleById(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});