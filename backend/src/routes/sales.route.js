const router = require('express').Router();

const { salesController } = require('../controllers');
const { validateId, validateQuantity } = require('../middlewares/validateSale');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', validateId, validateQuantity, salesController.create);

module.exports = router;
