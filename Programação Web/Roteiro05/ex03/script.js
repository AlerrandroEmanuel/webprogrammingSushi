app.get('/produto/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        id: id,
        mensagem: `Produto ${id} encontrado`
    });
});