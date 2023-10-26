const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { validateQuantity, validateId } = require('../../../src/middlewares/validateSale');

describe('testa o middleware validateQuantity', function () {
  it('testa se o middleware retorna um erro quando o campo quantity não é enviado', function () {
  const req = {};
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.spy(),
  };

  const next = sinon.spy();
  
  req.body = [
    { quantity: 5 },
    { price: 10 },
  ];
  
  validateQuantity(req, res, next);

  expect(res.status).to.be.calledWith(400);
  expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
});

  it('testa se o middleware retorna um erro quando o campo quantity é menor que 1', function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  
    const next = sinon.spy();
    
    req.body = [
      { quantity: 3 },
      { quantity: 0 },
    ];
    
    validateQuantity(req, res, next);
  
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('testa se o middleware chama a função next() após validação', async function () {
    const req = { body: [{ productId: 1 }, { productId: 2 }, { productId: 3 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.stub();
    
    await validateId(req, res, next);

    expect(next.called).to.be.equal(true);
    expect(res.status.called).to.be.equal(false);
    expect(res.json.called).to.be.equal(false);  
  });

  it('testa se o middleware retorna um erro quando o campo productId não é enviado', async function () {
    const req = { body: [{ productId: 1 }, { price: 10 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.spy();
    
    await validateId(req, res, next);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"productId" is required' });
  });

  it('testa se o middleware retorna um erro quando o campo productId não é encontrado', async function () {
    const req = { body: [{ productId: 1 }, { productId: 2 }, { productId: 10 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.spy();
    
    await validateId(req, res, next);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
