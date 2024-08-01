const express = require('express');
const modelController = require('../controllers/modelController');

const router = express.Router();

router.get('/', modelController.getAllModels);
// router.post('/', modelController.createModel);
router.put('/:id', modelController.updateModel);

module.exports = router;