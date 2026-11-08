// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js

const database = require("../config/database");

async function listarJogos(req, res) {
    try {

        const [jogos] = await database.execute(
            "SELECT * FROM jogos" // consulta SQL
        ); 

        res.satus(200).json(jogos)
        // 200: operação realizada com sucesso.
        // .json(jogos): envia os registros em formato JSON.


    } catch (erro) {

        console.log("Erro ao listar os jogo ", erro)

        res.status(500).json({
            mensagem: "Erro interno ao buscar jogos."
        });

    }
}

module.exports = {
    listarJogos
};