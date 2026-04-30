const express = require('express');
const cors = require('cors');
const app = express();
//app.use(cors());
app.get('/usuarios', (req, res) => {
    res.json([
        { id: 1, nome: 'Ana' }
    ]);
});
app.listen(5500, () => {
    console.log('Servidor rodando');
});

//Requisição cross-origin bloqueada: A diretiva Same Origin (mesma origem) não permite a leitura do recurso remoto em http://localhost:5500/usuarios (motivo: falta cabeçalho 'Access-Control-Allow-Origin' no CORS). Código de status: 404.