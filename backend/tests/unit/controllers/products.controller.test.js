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

    it('testa se o controller retorna um erro caso o produto não exista', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves(products.notFound);
      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });  

    it('testa se o controller cria um produto', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Caneca do Iron Man',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'create').resolves(products.created);
      await productsController.create(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(products.productsMock[0]);
    });

    it('testa se o controller retorna um erro caso o produto não seja criado', async function () {
      const res = {};
      const req = {
        body: {
          name: 'RBD',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'create').resolves(products.invalidName);
      await productsController.create(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('testa se o controller retorna um erro caso o produto não seja atualizado', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'RBD',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'update').resolves(products.invalidName);
      await productsController.update(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('testa se o controller deleta um produto', async function () {
      const req = { params: { id: 1 } };
      const res = { end: () => {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'remove').resolves({ affectedRows: 1 });
      await productsController.remove(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });

    it('testa se o controller retorna um erro caso o produto não seja deletado', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'remove').resolves(products.notFound);
      await productsController.remove(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
});