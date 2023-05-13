const express = require('express');
const userMiddleware = require('../middleware/usuarios.js');
const UsuarioController = require('../controllers/UsuarioController.js');
const router  = express.Router(); 

router.post('/sign-up',userMiddleware.validateRegister, UsuarioController.signUp);
router.post('/login', UsuarioController.login);
router.get('/secret-route',userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;