const express = require('express');
const rotas = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', rotas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('acima de nois só deus, pq aviao nois derruba');
});

