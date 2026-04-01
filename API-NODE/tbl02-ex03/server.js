const http = require('http');

const produtos = [
    { id: 1, nome: "Notebook", preco: 3000 },
    { id: 2, nome: "Mouse", preco: 50 },
    { id: 3, nome: "Teclado", preco: 150 }
];

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/api/produtos') {
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(produtos));
    }

    if (url.startsWith('/api/produtos/')) {
        const id = Number(url.split('/')[3]);
        const produto = produtos.find(p => p.id === id);

        res.setHeader('Content-Type', 'application/json');

        if (!produto) {
            return res.end(JSON.stringify({ erro: "Produto não encontrado" }));
        }

        return res.end(JSON.stringify(produto));
    }

    res.end("Rota não encontrada");
});

server.listen(3003);