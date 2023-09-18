const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock, salesMockId } = require('../mocks/sales.mock');

describe('testa sales model', function () {
  it('testa se o model retorna uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(salesMock);
  });

  it('testa se o model retorna uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMockId]);
    const result = await salesModel.getById(2);
    expect(result).to.be.deep.equal(salesMockId);
  });

  it('testa se o model cria uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.createData();
    expect(result).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});