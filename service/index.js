const { where } = require("sequelize");
const { massagem } = require("../data/db");

const createMassage = async (data) => {
    try {
        const newMassage = await massagem.create(data);
        console.log('### createMassage ', newMassage);
        return newMassage;
    } catch (error) {
        console.log('Error: erro ao criar nova massagem no banco: ', error);
        return { error: error };
    }
}

const getMassageById = async (data) => {
    try {
        const newMassage = await massagem.findOne({ where: { id: data.id } });
        console.log('### getMassageById ', newMassage);
        return newMassage;
    } catch (error) {
        console.log('Error: erro ao buscar massagem no banco: ', error);
        return { error: error };
    }
}

const getAll = async () => {
    try {
        const massage = await massagem.findAll();
        return massage;
    } catch (error) {
        console.log('Error: erro ao buscar todos massagem no banco: ', error);
        return { error: error };
    }
}

module.exports = { createMassage, getMassageById, getAll }