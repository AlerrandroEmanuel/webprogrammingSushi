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
    const url = req.url;

    if (url.startsWith('/usuarios/')) {
        const id = Number(url.split('/')[2]);

        if (isNaN(id)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ erro: "ID inválido" }));
        }

        try {
            const resultado = await pool.query(
                'SELECT * FROM usuarios WHERE id = $1',
                [id]
            );

            res.setHeader('Content-Type', 'application/json');

            if (resultado.rows.length === 0) {
                return res.end(JSON.stringify({ erro: "Não encontrado" }));
            }

            return res.end(JSON.stringify(resultado.rows[0]));

        } catch (erro) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ erro: "Erro no servidor" }));
        }
    }

    res.end("Rota não encontrada");
});

server.listen(3005);