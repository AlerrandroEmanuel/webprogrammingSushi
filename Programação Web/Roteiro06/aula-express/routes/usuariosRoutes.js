const express = require('express');
const router = express.Router();
// importar controller
const usuariosController = require('../controllers/usuariosController');
// rotas
router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.buscarUsuario);
module.exports = router;