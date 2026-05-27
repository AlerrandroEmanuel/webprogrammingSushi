const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET = 'segredo_super_forte';
// Simulação de banco de dados
const usuarios = [
    { id: 1, usuario: 'admin', senha: '123' }
];
// Rota de login
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) {
        return res.status(400).json({ erro: 'Preencha usuario e senha' });
    }
    const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (!user) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
        {
            id: user.id,
            usuario: user.usuario
        },
        SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token });
});
// Middleware de autenticação
function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não enviado' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ erro: 'Token inválido ou expirado' });
        }
        req.usuario = decoded;
        next();
    });
}
// Rota protegida
app.get('/perfil', autenticarToken, (req, res) => {
    res.json({
        mensagem: 'Acesso autorizado',
        usuario: req.usuario
    });
});
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
