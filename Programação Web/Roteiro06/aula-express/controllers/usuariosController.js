// lista de usuários (simulação)
const usuarios = [
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Carlos' }
];
// listar todos
function listarUsuarios(req, res) {
    res.json(usuarios);
}
// buscar por id
function buscarUsuario(req, res) {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuario);
}
module.exports = {
    listarUsuarios,
    buscarUsuario
};