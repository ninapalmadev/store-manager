const salesMock = [
  {
    saleId: 1,
    date: '2023-09-14T23:08:10.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-09-14T23:08:10.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-09-14T23:08:10.000Z',
    productId: 3,
    quantity: 15,
  },
];

const successful = {
  status: 'SUCCESSFUL',
  result: salesMock,
};

const salesMockId = [
  {
    date: '2023-06-29T14:48:29.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesId = {
  status: 'SUCCESSFUL',
  result: salesMockId,
};

module.exports = {
  salesMock,
  successful,
  salesId,
  salesMockId,
};