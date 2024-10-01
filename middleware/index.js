const { getAll } = require("../service");

const validationMiddleware = async (req, res, next) => {
    // as massagens podem ser 10 para cada 1 horario: ok 
    // os horarios sao de 20 em 20 minutos: ok
    // vai ser 09:00 as 17:40: ok
    // as 11:00 inicio do almoço de 5 funcionario fim 12:00.
    // as 14:00 inicio do almoço de 5 funcionario fim 15:00.
    // validar horario dos dias seguintes.
    // * novo dado
    // typeMassage, vai definir tipo A e B.
    // cada tipo possui certa quatidade de massagista.
    // adicionar na pausa lanch todas as pausas
    const { nomeCompleto, unidade, re, eo, horario, typeMassage } = req.body;

    if (!nomeCompleto || !unidade || !re || !eo || !horario || !typeMassage ){
        return res.status(500).json({ message: 'Erro: campos não preenchidos' })
    }

    const massages = await getAll();
    console.log('### validationMiddleware massages ', massages)

    const promise = await Promise.all([
        availableTime(massages, horario, res, typeMassage), lunchTime(massages, horario, res, typeMassage)
    ]);
    console.log(promise)
    if (promise.every(e => !!e && !e.error)) return next()

    return res.status(400).json({ message: promise.find(f => f.error).error })
}

const availableTime = async (massages, horario, res, typeMassage) => {
    if (typeMassage === 'reflexologia') {
        var countA = 0;
        for (let i = 0; i < massages.length; i++) {
            if (massages[i].horario === horario && massages[i].typeMassage === 'reflexologia') { countA++ }
        }
        if (countA === 8) {
            console.log('Error: erro ao buscar massagem no banco');
            return { error: 'Error: Horario Indisponivel', status: 400 };
        }
    } else {
        var countB = 0;
        for (let i = 0; i < massages.length; i++) {
            if (massages[i].horario === horario && massages[i].typeMassage === 'quickMassage') { countB++ }
        }
        if (countB === 10) {
            console.log('Error: erro ao buscar massagem no banco');
            return { error: 'Error: Horario Indisponivel', status: 400 };
        }
    }
    return true;
}

const lunchTime = async (massages, horario, res, typeMassage) => {
    if (horario === '10:00'
        || horario === '10:15'
        || horario === '11:30'
        || horario === '11:45'
        || horario === '13:00'
        || horario === '13:15'
        || horario === '13:45'
        || horario === '14:00'
        || horario === '14:15'
        || horario === '14:30'
        || horario === '14:45'
        || horario === '15:00'
        || horario === '15:15'
        || horario === '15:30'
        || horario === '15:45'
        || horario === '16:15'
        || horario === '17:30'
        || horario === '18:00'
    ) {
        // lanchTime reflexologia
        if (typeMassage === 'reflexologia') {
            var countA = 0;
            for (let i = 0; i < massages.length; i++) {
                if (massages[i].horario === horario && massages[i].typeMassage === 'reflexologia') { countA++ }
            }
            if (countA === 4) {
                console.log('Error: erro ao buscar massagem no banco');
                return { error: 'Error: Horario Indisponivel', status: 400 };
            }
        } else {
            // lanchTime quickMassage
            var countB = 0;
            for (let i = 0; i < massages.length; i++) {
                if (massages[i].horario === horario && massages[i].typeMassage === 'quickMassage') { countB++ }
            }
            if (countB === 5) {
                console.log('Error: erro ao buscar massagem no banco');
                return { error: 'Error: Horario Indisponivel', status: 400 };
            }
        }
    }
    return true;
}

module.exports = { validationMiddleware };