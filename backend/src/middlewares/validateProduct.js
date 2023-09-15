const validateProduct = (req, res, next) => {
  const { name } = req.body;
  const length = name < 5;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (!length) {
    return res.status(422).json(
      { message: '"name" length must be at least 5 characters long' },
      );
  }
  next();
};

module.exports = validateProduct;