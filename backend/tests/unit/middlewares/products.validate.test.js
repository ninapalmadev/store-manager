const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { validateProduct, validateName } = require('../../../src/middlewares/validateProduct');

describe('testa o middleware validateProduct', function () {
  it('testa se o middleware retorna um erro quando o campo name não é enviado', function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    validateProduct(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });

  it('testa se o middleware retorna um erro quando o campo name é menor que 5 caracteres', function () {
    const req = {
      body: {
        name: 'oi',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    validateName(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('testa se o middleware chama a função next() após validação', function () {
    const req = {
      body: {
        name: 'Capacete do Homem de Ferro',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.stub();
    validateProduct(req, res, next);
    expect(next.called).to.be.equal(true);
    expect(res.status.called).to.be.equal(false);
    expect(res.json.called).to.be.equal(false);  
  });

  afterEach(function () {
    sinon.restore();
  });
});