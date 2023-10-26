const productsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const product = {
  id: 13,
  name: 'Capacete do Homem de Ferro',
};

const successful = {
  status: 'SUCCESSFUL',
  result: productsMock,
};

const productsId = {
  status: 'SUCCESSFUL',
  result: productsMock[1],
};

const notFound = {
  status: 'NOT_FOUND',
  result: { message: 'Product not found' },
};

const invalidName = {
  status: 'INVALID_VALUE',
  result: { message: '"name" length must be at least 5 characters long' },  
};

const created = {
  status: 'CREATED',
  result: productsMock[0],
};

const updatedMock = {
  id: 1,
  name: 'Martelo da Arlequina',
};

const updated = {
  affectedRows: 1,
};

module.exports = {
  productsMock,
  product,
  successful,
  productsId,
  notFound,
  created,
  updated,
  updatedMock,
  invalidName,
};