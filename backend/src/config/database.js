// DATABASE.js -> faz a conexão com o env e o sql
const mysql = require("mysql2/promise"); // importando o módulo mysql2 com suporte a Promises
require("dotenv").config(); // carrgando as váriaveis de ambiente

// Criação da pool de conexões
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Conexão segura com TiDB Cloud
    ssl: process.env.DB_SSL === "true"
        ? { minVersion: "TLSv1.2" }
        : undefined
});

module.exports = conexao;