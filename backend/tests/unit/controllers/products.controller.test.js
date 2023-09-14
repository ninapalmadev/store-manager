const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const products = require('../mocks/products.mock');

chai.use(sinonChai);

describe('verifica se o controller de produtos retorna um produto', function () {
  it('testa se produtos são listados', async function () {
    sinon.stub(productsService, 'getAll').resolves(products.successful);
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products.productsMock);
    });

    it('testa se o controller retorna um produto pelo id', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves(products.productsId);
      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products.productsMock[1]);
    });

    afterEach(function () {
      sinon.restore();
    });
});