const express = require('express');

const router = express.Router();

const {
    cadastrar,
    login,
    me,
    admin
} = require('../controllers/authController');

const autenticarToken = require('../middlewares/authMiddleware');

const autorizarRole = require('../middlewares/roleMiddleware');

/*
========================================
ROTAS PÚBLICAS
========================================
*/
router.post('/register', cadastrar);

router.post('/login', login);

/*
========================================
ROTAS PROTEGIDAS
========================================
*/
router.get(
    '/me',
    autenticarToken,
    me
);

router.get(
    '/admin',
    autenticarToken,
    autorizarRole('admin'),
    admin
);

module.exports = router;