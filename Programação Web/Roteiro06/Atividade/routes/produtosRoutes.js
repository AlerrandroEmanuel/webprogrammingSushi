const express = require('express');
const router = express.Router();
// importar controller
const produtosController = require('../controllers/produtosController');
// rotas
router.get('/', produtosController.listarProdutos);
router.get('/:id', produtosController.buscarProdutos);
router.get('/produtos/total', totalProdutos);
module.exports = router;