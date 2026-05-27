const express = require('express');
const app = express();
// importar rotas
const usuariosRoutes = require('./routes/usuariosRoutes');
// usar rotas
app.use('/usuarios', usuariosRoutes);
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
