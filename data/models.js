module.exports = (sequelize, DataTypes) => {
    const massagem = sequelize.define('massagem', {
        nomeCompleto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        re: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        typeMassage: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return massagem
}