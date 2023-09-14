const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const sales = require('../mocks/sales.mock');

chai.use(sinonChai);

describe('verifica se o controller de vendas retorna uma venda', function () {
  it('testa se vendas são listadas', async function () {
    sinon.stub(salesService, 'getAll').resolves(sales.successful);
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales.salesMock);
  });

  it('testa se o controller retorna uma venda pelo id', async function () {
    sinon.stub(salesService, 'getById').resolves(sales.salesId);
    const req = {
      body: { },
      params: {
        id: 2,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales.salesMockId);
  });

  afterEach(function () {
    sinon.restore();
  });
});