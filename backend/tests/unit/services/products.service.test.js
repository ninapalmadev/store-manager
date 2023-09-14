const sinon = require('sinon');
const { expect } = require('chai');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsMock } = require('../mocks/products.mock');

describe('testa products service', function () {
  it('testa se o service retorna um produto', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsMock);
    const result = await productsService.getAll();
    expect(result).to.be.deep.equal({ status: 'SUCCESSFUL', result: productsMock });
  });

  it('testa se o service retorna um produto pelo id', async function () { 
    sinon.stub(productsModel, 'getById').resolves(productsMock[1]);
    const result = await productsService.getById(1);
    expect(result).to.be.deep.equal({ status: 'SUCCESSFUL', result: productsMock[1] });
  });

  it('testa se o service retorna um erro quando não encontra o produto', async function () {
    sinon.stub(productsModel, 'getById').resolves(null);
    const result = await productsService.getById(1);
    expect(result).to.be.deep.equal({ status: 'NOT_FOUND', result: { message: 'Product not found' } });
  });

  afterEach(function () {
    sinon.restore();
  });
});