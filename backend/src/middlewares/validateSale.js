const { productsModel } = require('../models');

const validateId = async (req, res, next) => {
  const products = await productsModel.getAll();
  const ids = products.map(({ id }) => id);

  const { body } = req;
  const saleId = body.map(({ productId }) => productId);

  const validate = saleId.some((item) => item === undefined);
  const validateProductId = saleId.every((item) => ids.includes(item));

  if (validate) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!validateProductId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const validateQuantity = async (req, res, next) => {
  const saleQuantity = req.body.map(({ quantity }) => quantity);

  const validate = saleQuantity.some((item) => item === undefined);
  const validateQnty = saleQuantity.some((item) => item <= 0);

  if (validate) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (validateQnty) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validateId,
  validateQuantity,
};