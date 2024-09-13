const Sequelize = require('sequelize');

// Definir informações de conexão
const dbName = 'massagem';
const dbUser = 'root';
const dbPassword = 'root123';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.massagem = require('./models')

module.exports = db
