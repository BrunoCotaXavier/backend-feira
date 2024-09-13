const express = require('express');
const syncDatabase = require('./data/sync');
const app = express();
const db = require('./data/db');
const migration = require('./data/migration');

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Olá, este é o seu serviço em Node.js!');
});

app.post('/natanzin', (req, res) => {
    const { nome, sobrenome, idade } = req.body;
    const formulario = {
        nome: nome,
        sobrenome: sobrenome,
        idade: idade
    }
    res.send('Seus dados foram salvos com sucesso!');
})

migration();

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`);
    });
});
