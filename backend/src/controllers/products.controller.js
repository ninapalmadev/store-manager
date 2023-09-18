const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, result } = await productsService.getAll();
  return res.status(mapStatusHTTP(status)).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await productsService.getById(id);
  return res.status(mapStatusHTTP(status)).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { status, result } = await productsService.create(name);
  return res.status(mapStatusHTTP(status)).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, result } = await productsService.update(name, Number(id));
  return res.status(mapStatusHTTP(status)).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await productsService.remove(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json(result);
  }
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};