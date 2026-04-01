const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url.startsWith('/usuario/')) {
        const partes = url.split('/');
        const id = Number(partes[2]);

        if (isNaN(id)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ erro: "ID inválido" }));
        }

        const usuario = {
            id,
            nome: `Usuario ${id}`
        };

        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(usuario));
    }

    res.end("Rota não encontrada");
});

server.listen(3001, () => {
    console.log("Rodando na porta 3001");
});