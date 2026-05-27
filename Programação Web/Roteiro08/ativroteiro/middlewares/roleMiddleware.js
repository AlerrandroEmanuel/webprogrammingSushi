function autorizarRole(roleNecessaria) {

    return (req, res, next) => {

        try {

            if (!req.usuario) {
                return res.status(401).json({
                    sucesso: false,
                    erro: 'Usuário não autenticado'
                });
            }

            if (req.usuario.role !== roleNecessaria) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado'
                });
            }

            next();

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    };
}

module.exports = autorizarRole;