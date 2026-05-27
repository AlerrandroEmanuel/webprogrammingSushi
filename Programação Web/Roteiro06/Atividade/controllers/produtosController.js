// lista de usuários (simulação)
const produtos = [
    { id: 1, nome: 'Chocolate' },
    { id: 2, nome: 'Bolacha' },
    { id: 3, nome: 'TV' }
];
// listar todos
function listarProdutos(req, res) {
    res.json({
        mensagem: 'Sucesso',
        dados: produtos
    });
}
// buscar por id
function buscarProdutos(req, res) {
    const id = parseInt(req.params.id);
    const produto = produtos.find(u => u.id === id);
    if (!produto) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json({
        mensagem: 'Sucesso',
        dados: produto
    });
}

// total de produtos
function totalProdutos(req, res) {
    res.json({
        total: produtos.length
    });
}

module.exports = {
    listarProdutos,
    buscarProdutos,
    totalProdutos
};