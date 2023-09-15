const { productsModel } = require('../models');

const getAll = async () => {
  const result = await productsModel.getAll();
  return { status: 'SUCCESSFUL', result };
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return { result: { message: 'Product not found' }, status: 'NOT_FOUND' };
  }
  return { status: 'SUCCESSFUL', result };
};

const create = async (name) => {
  const result = await productsModel.create(name);
  return { status: 'CREATED', result };
};

module.exports = {
  getAll,
  getById,
  create,
};