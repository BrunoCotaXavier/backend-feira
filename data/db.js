const Sequelize = require('sequelize');

// Definir informações de conexão
const dbName = 'massagem';
const dbUser = 'root';
const dbPassword = 'root123';
const dbHost = '127.0.0.1';

const sequelize = new Sequelize(dbName, dbUser, {
  host: dbHost,
  dialect: 'mysql',
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.massagem = require('./models')(sequelize, Sequelize.DataTypes); 

module.exports = db
