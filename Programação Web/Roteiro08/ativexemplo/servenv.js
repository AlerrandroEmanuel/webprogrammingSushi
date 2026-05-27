require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET = process.env.SECRET;
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario === 'admin' && senha === '123') {
        const token = jwt.sign({ usuario }, SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ erro: 'Credenciais inválidas' });
});
app.listen(process.env.PORT || 3000);