const mysql = require('mysql2');

module.exports = async () => {
    // Definir informações de conexão
    const dbName = 'massagem';
    const dbUser = 'root';
    const dbPassword = 'root123';
    const dbHost = 'localhost';
    
    // Criar uma conexão sem especificar um banco de dados
    const connection = mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
    });
    
    // Conectar ao MySQL
    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
      }
    
      // Verificar se o banco de dados já existe
      connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err) {
          console.error('Erro ao criar o banco de dados:', err);
        } else {
          console.log(`Banco de dados '${dbName}' criado com sucesso!`);
        }
    
        // Fechar a conexão
        connection.end();
      });
    });
}
