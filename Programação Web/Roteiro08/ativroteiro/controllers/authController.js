const jwt = require('jsonwebtoken');
const usuarios = require('../data/usuarios');

/*
========================================
CADASTRO
========================================
*/
function cadastrar(req, res) {

    try {

        const { usuario, senha, role } = req.body;

        // validações
        if (!usuario || usuario.trim() === '') {
            return res.status(400).json({
                sucesso: false,
                erro: 'Usuário é obrigatório'
            });
        }

        if (!senha || senha.length < 3) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Senha inválida'
            });
        }

        // verificar usuário existente
        const usuarioExiste = usuarios.find(
            u => u.usuario === usuario
        );

        if (usuarioExiste) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Usuário já existe'
            });
        }

        const novoUsuario = {
            id: usuarios.length + 1,
            usuario,
            senha,
            role: role || 'user'
        };

        usuarios.push(novoUsuario);

        res.status(201).json({
            sucesso: true,
            dados: novoUsuario
        });

    } catch (error) {

        res.status(500).json({
            sucesso: false,
            erro: 'Erro ao cadastrar usuário'
        });
    }
}

/*
========================================
LOGIN
========================================
*/
function login(req, res) {

    try {

        const { usuario, senha } = req.body;

        // validação
        if (!usuario || !senha) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Usuário e senha são obrigatórios'
            });
        }

        const user = usuarios.find(
            u => u.usuario === usuario && u.senha === senha
        );

        if (!user) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Credenciais inválidas'
            });
        }

        // gerar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                usuario: user.usuario,
                role: user.role
            },
            process.env.SECRET,
            {
                expiresIn: '30s'
            }
        );

        res.json({
            sucesso: true,
            dados: {
                token
            }
        });

    } catch (error) {

        res.status(500).json({
            sucesso: false,
            erro: 'Erro ao fazer login'
        });
    }
}

/*
========================================
ROTA PROTEGIDA
========================================
*/
function me(req, res) {

    res.json({
        sucesso: true,
        dados: req.usuario
    });
}

/*
========================================
ÁREA ADMIN
========================================
*/
function admin(req, res) {

    res.json({
        sucesso: true,
        dados: 'Bem-vindo à área administrativa'
    });
}

module.exports = {
    cadastrar,
    login,
    me,
    admin
};