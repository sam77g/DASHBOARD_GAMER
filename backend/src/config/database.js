const mysql = require("mysql2/promise"); // importando o módulo mysql2 com suporte a Promises
require("dotenv").config(); // carrgando as váriaveis de ambiente

// Criação da pool
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = conexao; // exportando