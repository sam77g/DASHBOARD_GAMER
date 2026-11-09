// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js

const database = require("../config/database");

async function listarJogos(req, res) {
    try {
        const  {plataforma} = req.query;

        if (!plataforma){
            let [jogos] = await database.execute(
                "SELECT * FROM jogos "
            );
            res.status(200).json(jogos)  
        }else{
            let [jogos] = await database.execute(
                "SELECT * FROM jogos WHERE plataforma = ?",
                [plataforma]
            );
            // 200: operação realizada com sucesso.
            // .json(jogos): envia os registros em formato JSON.
            res.status(200).json(jogos);
        }
        
    } catch (erro) {

        console.error("Erro ao listar jogos:", erro);

        res.status(500).json({
            mensagem: "Erro interno ao buscar jogos."
        });

    }

}

module.exports = {
    listarJogos
};