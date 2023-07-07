const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesFromServiceSuccess, allSalesFromModel, saleByIdFromServiceSuccess, saleByIdFromModel, saleByIdFromServiceNotFound } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Sales Controller Test', function () {
  describe('GET endpoint', function () {
    it('Successfully receives all sales', async function () {
      sinon.stub(salesService, 'getAllSales').resolves(allSalesFromServiceSuccess);
    
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    
      await salesController.allSalles(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesFromModel);
    });

    it('Successfully receives a sale by id', async function () {
      sinon.stub(salesService, 'getSaleById').resolves(saleByIdFromServiceSuccess);
    
      const req = {
        params: { id: 2 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    
      await salesController.saleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleByIdFromModel);
    });

    it('Receives status 404 when non-existent id', async function () {
      sinon.stub(salesService, 'getSaleById').resolves(saleByIdFromServiceNotFound);
    
      const req = {
        params: { id: 99 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    
      await salesController.saleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'message' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});