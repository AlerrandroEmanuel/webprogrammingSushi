const express = require('express');
const app = express();
// importar rotas
const produtosRoutes = require('./routes/produtosRoutes');
// usar rotas
app.use('/produtos', produtosRoutes);
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
