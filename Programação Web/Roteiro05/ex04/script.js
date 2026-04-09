app.get('/busca', (req, res) => {
    const nome = req.query.nome;

    res.json({
        resultado: nome
    });
});