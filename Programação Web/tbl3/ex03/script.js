const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
origin: 'http://localhost:5500',
methods: ['GET', 'POST']
}));
app.get('/usuarios', (req, res) => {
    res.json([
        { id: 1, nome: 'Ana' }
    ]);
});
app.listen(3000, () => {
    console.log('Servidor rodando');
});



//Requisição cross-origin bloqueada: A diretiva Same Origin (mesma origem) não permite a leitura do recurso remoto em http://localhost:3000/usuarios (motivo: cabeçalho 'Access-Control-Allow-Origin' do CORS não corresponde a 'http://localhost:5500').