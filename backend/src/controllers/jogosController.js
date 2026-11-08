// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js

const database = require("../config/database");

async function listarJogos(req, res) {
    try {

        const [jogos] = await database.execute(
            "SELECT * FROM jogos"
        )

        res.satus(200).json(jogos)


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