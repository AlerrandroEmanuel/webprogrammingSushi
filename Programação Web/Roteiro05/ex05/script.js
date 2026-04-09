app.get('/api/alunos', (req, res) => {
    const alunos = [
        { id: 1, nome: 'João' },
        { id: 2, nome: 'Maria' },
        { id: 3, nome: 'Pedro' }
    ];

    res.json(alunos);
});