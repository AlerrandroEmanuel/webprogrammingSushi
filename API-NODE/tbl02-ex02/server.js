const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/teste') {
        if (req.method === 'GET') {
            return res.end("GET funcionando");
        } else {
            res.statusCode = 405;
            return res.end("Método não permitido");
        }
    }

    res.end("Rota não encontrada");
});

server.listen(3002);