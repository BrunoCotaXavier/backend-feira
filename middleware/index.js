const { getAll } = require("../service");

const validationMiddleware = async (req, res, next) => {
    // as massagens podem ser 10 para cada 1 horario: ok 
    // os horarios sao de 20 em 20 minutos: ok
    // vai ser 09:00 as 17:40: ok
    // as 11:00 inicio do almoço de 5 funcionario fim 12:00.
    // as 14:00 inicio do almoço de 5 funcionario fim 15:00.

    const { nomeCompleto, unidade, re, eo, horario } = req.body;
    const massages = await getAll();
    console.log('### validationMiddleware massages ', massages)

    const promise = await Promise.all([
        availableTime(massages, horario, res), lunchTime1(massages, horario, res), lunchTime2(massages, horario, res)
    ]);
    console.log(promise)
    if (promise.every(e => !!e && !e.error)) return next()

    return res.status(400).json({ message: promise.find(f => f.error).error })
}

const availableTime = async (massages, horario, res) => {
    var count = 0;
    for (let i = 0; i < massages.length; i++) {
        if (massages[i].horario === horario) { count++ }
    }
    if (count === 5) {
        console.log('Error: erro ao buscar massagem no banco');
        return { error: 'Error: Horario Indisponivel', status: 400 };
    }
    return true;
}

const lunchTime1 = async (massages, horario, res) => {
    if (horario === '11:00'
        || horario === '11:20'
        || horario === '11:40') {
        var count = 0;
        for (let i = 0; i < massages.length; i++) {
            if (massages[i].horario === horario) { count++ }
        }
        if (count === 2) {
            console.log('Error: erro ao buscar massagem no banco');
            return { error: 'Error: Horario Indisponivel', status: 400 };
        }
    }

    return true;
}

const lunchTime2 = async (massages, horario, res) => {
    if (horario === '14:00'
        || horario === '14:20'
        || horario === '14:40') {
        var count = 0;
        for (let i = 0; i < massages.length; i++) {
            if (massages[i].horario === horario) { count++ }
        }
        if (count === 2) {
            console.log('Error: erro ao buscar massagem no banco');
            return { error: 'Error: Horario Indisponivel', status: 400 };
        }
    }
    return true;

}

module.exports = { validationMiddleware };