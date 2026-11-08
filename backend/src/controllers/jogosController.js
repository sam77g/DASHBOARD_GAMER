// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js

const database = require("../config/database");

async function listarJogos(req, res) {
    try {

        const [jogos] = await database.execute(
            "SELECT * FROM jogos"
        )

        return jogos


    } catch (erro) {

        console.log(erro)

        throw erro

    }
}

module.exports = {
    listarJogos
};