const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/', validateProduct, productsController.create);

module.exports = route;