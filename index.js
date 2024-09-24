const express = require('express');
const app = express();
const db = require('./data/db');
const migration = require('./data/migration');
const { createMassage, getAll } = require('./service/index');
const { validationMiddleware } = require('./middleware');
const cors = require('cors');

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/createMassage', validationMiddleware, (req, res) => {
    const { nomeCompleto, unidade, re, eo, horario } = req.body;
    const formulario = {
        nomeCompleto,
        unidade,
        re,
        eo,
        horario
    };
    try {
        createMassage(formulario)
            .then(data => {
                console.log('### data ', data)
                return res.status(200).json({ message: 'Dados salvo com sucesso!', data });
            })
    } catch (error) {
        res.status(400).json({ message: '### Error: erro no post ao criar nova massagem ', error });
    }
});

app.get('/listMassages', async (req, res) => {
    try {
        const massages = await getAll();
        res.status(200).json({ message: 'listagem concluida', massages })
    } catch (error) {
        res.status(400).json({ message: '### Error: erro no get all de massagem ', error });
    }
})



migration();

db.sequelize.sync(/* { force: true } */).then(() => {
    app.listen(PORT, () => {
        console.log(`### Servidor rodando na porta: ${PORT}`);
    });
});
