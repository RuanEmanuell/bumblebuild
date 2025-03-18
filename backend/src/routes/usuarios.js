const express = require('express')
const router = express.Router();

const usuarioController = require('../controllers/usuarios')
const token = require('../authMiddleware')

router.post('/',usuarioController.criaUsuario);
router.post('/login', usuarioController.loginUsuario)
router.post('/logout', usuarioController.logout)

module.exports = router