const express = require('express');

const app = express();

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
ARRAY DE PRODUTOS
========================================
*/
let produtos = [];

/*
========================================
FUNÇÃO DE VALIDAÇÃO
========================================
*/
function validarProduto(nome, preco) {

    // validar nome vazio
    if (!nome || nome.trim() === '') {
        return 'Nome é obrigatório';
    }

    // validar preço
    if (preco === undefined || isNaN(preco) || Number(preco) <= 0) {
        return 'Preço inválido';
    }

    return null;
}

/*
========================================
CREATE
POST /produtos
========================================
*/
app.post('/produtos', (req, res) => {

    const { nome, preco } = req.body;

    const erro = validarProduto(nome, preco);

    if (erro) {
        return res.status(400).json({
            sucesso: false,
            erro: erro
        });
    }

    const produto = {
        id: produtos.length + 1,
        nome,
        preco: Number(preco)
    };

    produtos.push(produto);

    res.status(201).json({
        sucesso: true,
        dados: produto
    });
});

/*
========================================
READ
GET /produtos
========================================
*/
app.get('/produtos', (req, res) => {

    res.json({
        sucesso: true,
        dados: produtos
    });
});

/*
========================================
READ BY ID
GET /produtos/:id
========================================
*/
app.get('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);

    // validar id
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido'
        });
    }

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado'
        });
    }

    res.json({
        sucesso: true,
        dados: produto
    });
});

/*
========================================
UPDATE
PUT /produtos/:id
========================================
*/
app.put('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido'
        });
    }

    const { nome, preco } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado'
        });
    }

    const erro = validarProduto(nome, preco);

    if (erro) {
        return res.status(400).json({
            sucesso: false,
            erro: erro
        });
    }

    produto.nome = nome;
    produto.preco = Number(preco);

    res.json({
        sucesso: true,
        dados: produto
    });
});

/*
========================================
DELETE
DELETE /produtos/:id
========================================
*/
app.delete('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido'
        });
    }

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado'
        });
    }

    produtos.splice(index, 1);

    res.json({
        sucesso: true,
        dados: 'Produto removido com sucesso'
    });
});

/*
========================================
SERVIDOR
========================================
*/
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});