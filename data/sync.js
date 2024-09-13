const initializeDatabase = require('./db'); // Importe a função que inicializa o banco
const massagem = require('./models');

async function syncDatabase() {
  try {
    // Chama a função para inicializar o banco e obter o Sequelize
    const sequelize = await initializeDatabase();

    // Sincroniza o modelo com a tabela no banco de dados
    await massagem.sync({ alter: true });
    console.log('Tabela sincronizada.');

  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

module.exports = syncDatabase;
