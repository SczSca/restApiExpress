
const express = require('express');
const ProductoController = require('../controllers/ProductoController.js');
// 1.
const router  = express.Router(); 

router.get('/', ProductoController.list);
router.post('/', ProductoController.create); 

module.exports = router;