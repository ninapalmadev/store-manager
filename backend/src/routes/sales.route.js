const router = require('express').Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', salesController.create);

module.exports = router;
