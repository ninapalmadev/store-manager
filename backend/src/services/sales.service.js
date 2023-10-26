const { salesModel } = require('../models');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { status: 'SUCCESSFUL', result };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  
  if (!result || result.length === 0) {
    return { result: { message: 'Sale not found' }, status: 'NOT_FOUND' };
  }
  return { status: 'SUCCESSFUL', result };
};

const create = async (body) => {
  const insertId = await salesModel.createData();
  const sales = body.map((item) => {
    const { productId, quantity } = item;
    return salesModel.create(insertId, productId, quantity);
  });
  await Promise.all(sales);
  return {
    status: 'CREATED',
    result: {
      id: insertId,
      itemsSold: body,
    },
  };
};

module.exports = {
  getAll,
  getById,
  create,
};