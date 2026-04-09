app.get('/api/produto', (req, res) => {
    res.json({
        nome: 'Notebook',
        preco: 3500
    });
});