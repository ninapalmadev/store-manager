const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsMock, product } = require('../mocks/products.mock');

describe('testa products model', function () {
  it('testa se o model retorna um produto', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(productsMock);
  });

  it('testa se o model retorna um produto pelo id', async function () { 
    sinon.stub(connection, 'execute').resolves([[productsMock[1]]]);
    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(productsMock[1]);
  });

  it('testa se o model cria um produto', async function () {
    sinon.stub(connection, 'execute').resolves([product]);
    const insertName = 'Capacete do Homem de Ferro';
    const result = await productsModel.create(insertName);
    expect(result).to.be.an('object');
  });

  it('testa se o model atualiza um produto', async function () {
    sinon.stub(connection, 'execute').resolves([product]);
    const insertName = 'Capacete do Homem de Ferro';
    const result = await productsModel.update(13, insertName);
    expect(result).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});