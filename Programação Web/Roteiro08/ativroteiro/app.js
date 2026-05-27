require('dotenv').config();

const express = require('express');

const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(express.json());

/*
========================================
MIDDLEWARE DE LOG
========================================
*/
app.use((req, res, next) => {

    console.log(`${req.method} ${req.url}`);

    next();
});

/*
========================================
ROTAS
========================================
*/
app.use(authRoutes);

/*
========================================
TRATAMENTO DE ROTA NÃO ENCONTRADA
========================================
*/
app.use((req, res) => {

    res.status(404).json({
        sucesso: false,
        erro: 'Rota não encontrada'
    });
});

/*
========================================
SERVIDOR
========================================
*/
app.listen(process.env.PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${process.env.PORT}`
    );
});