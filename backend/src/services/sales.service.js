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

module.exports = {
  getAll,
  getById,
};