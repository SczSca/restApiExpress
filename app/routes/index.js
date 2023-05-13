const productoRoute = require('./productos.js'); //productos routes
const usuarioRoute = require('./usuarios.js');//user routes

const express = require('express'); //express package
const router = express.Router();


router.use(express.json());




router.use('/productos', productoRoute);
router.use('/user', usuarioRoute);

module.exports = router;