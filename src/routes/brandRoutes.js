const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/', brandController.getAllBrands);
router.post('/', brandController.createBrand);
router.get('/:id/models', brandController.getModelsByBrand);
router.post('/:id/models', brandController.createModelForBrand);

module.exports = router;