const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Token não enviado'
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, decoded) => {

            if (err) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Token inválido'
                });
            }

            req.usuario = decoded;

            next();
        });

    } catch (error) {

        return res.status(500).json({
            sucesso: false,
            erro: 'Erro interno na autenticação'
        });
    }
}

module.exports = autenticarToken;