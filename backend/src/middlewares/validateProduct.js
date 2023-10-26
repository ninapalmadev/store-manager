const validateProduct = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const nameLength = 5;
  if (name.length < nameLength) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  validateProduct, 
  validateName,
};