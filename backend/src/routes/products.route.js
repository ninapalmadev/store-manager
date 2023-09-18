const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct, validateName } = require('../middlewares/validateProduct');

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/', validateProduct, validateName, productsController.create);
route.put('/:id', validateProduct, validateName, productsController.update);
route.delete('/:id', productsController.remove);

module.exports = route;