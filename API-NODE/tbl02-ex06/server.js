const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'PostgreSQL123',
    port: 5432,
});

const server = http.createServer(async (req, res) => {
    if (req.url === '/usuarios') {
        try {
            const resultado = await pool.query('SELECT * FROM usuarios');

            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(resultado.rows));

        } catch (erro) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ erro: "Erro no servidor" }));
        }
    }

    res.end("Rota não encontrada");
});

server.listen(3006);