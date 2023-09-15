const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/', validateProduct, productsController.create);
route.put('/:id', validateProduct, productsController.update);

module.exports = route;