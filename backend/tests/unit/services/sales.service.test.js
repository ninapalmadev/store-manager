const sinon = require('sinon');
const { expect } = require('chai');
const { salesService } = require('../../../src/services');  
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../mocks/sales.mock');

describe('testa sales service', function () {
  it('testa se o service retorna uma venda', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesMock);
    const result = await salesService.getAll();
    expect(result).to.be.deep.equal({ status: 'SUCCESSFUL', result: salesMock });
  });

  it('testa se o service retorna uma venda pelo id', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesMock[1]);
    const result = await salesService.getById(1);
    expect(result).to.be.deep.equal({ status: 'SUCCESSFUL', result: salesMock[1] });
  });

  it('testa se o service retorna um erro quando não encontra a venda', async function () {
    sinon.stub(salesModel, 'getById').resolves(null);
    const result = await salesService.getById(1);
    expect(result).to.be.deep.equal({ status: 'NOT_FOUND', result: { message: 'Sale not found' } });
  });

  it('testa se o service cria uma venda válida', async function () {
    sinon.stub(salesModel, 'createData').resolves(1);
    sinon.stub(salesModel, 'create').resolves([{
      productId: 1,
      quantity: 1,
    }]);
    const result = await salesService.create([{
      productId: 1,
      quantity: 1,
    }]);
    expect(result).to.be.deep.equal({
      status: 'CREATED',
      result: {
        id: 1,
        itemsSold: [{
          productId: 1,
          quantity: 1,
        }],
      },
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});