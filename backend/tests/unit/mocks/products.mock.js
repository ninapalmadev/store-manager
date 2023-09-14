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

const successful = {
  status: 'SUCCESSFUL',
  result: productsMock,
};

const productsId = {
  status: 'SUCCESSFUL',
  result: productsMock[1],
};

module.exports = {
  productsMock,
  successful,
  productsId,
};