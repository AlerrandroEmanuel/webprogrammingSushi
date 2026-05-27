const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
let usuarios = [];
// CREATE
app.post('/usuarios', (req, res) => {
    const { nome, idade } = req.body;
    if (!nome || !idade) {
        return res.status(400).json({
            sucesso: false, erro: 'Dados inválidos'
        });
    }
    const usuario = { id: usuarios.length + 1, nome, idade };
    usuarios.push(usuario);
    res.status(201).json({ sucesso: true, dados: usuario });
});
// READ
app.get('/usuarios', (req, res) => {
    res.json({ sucesso: true, dados: usuarios });
});
// READ ID
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({
            sucesso: false, erro: 'Não encontrado'
        });
    }
    res.json({ sucesso: true, dados: usuario });
});
// UPDATE
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade } = req.body;
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({
            sucesso: false, erro: 'Não encontrado'
        });
    }
    usuario.nome = nome;
    usuario.idade = idade;
    res.json({ sucesso: true, dados: usuario });
});
// DELETE
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({
            sucesso: false, erro: 'Não encontrado'
        });
    }
    usuarios.splice(index, 1);
    res.json({ sucesso: true, mensagem: 'Removido' });
});
app.listen(3000);