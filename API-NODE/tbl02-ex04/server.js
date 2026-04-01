const http = require('http');

let contador = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/contador') {
        contador++;

        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ acessos: contador }));
    }

    res.end("Rota não encontrada");
});

server.listen(3004);