app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema!');
});

app.get('/sobre', (req, res) => {
    res.send('Este é um sistema de exemplo usando Node.js');
});

app.get('/contato', (req, res) => {
    res.send('Contato: email@exemplo.com');
});