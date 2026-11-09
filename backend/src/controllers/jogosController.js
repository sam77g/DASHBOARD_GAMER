// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js

const database = require("../config/database");

async function listarJogos(req, res) {
    try {
        const  {plataforma} = req.query; // extrai diretamente a propiedade plataforma 
        let jogos ;

        if (!plataforma){

            [jogos] = await database.execute(
                "SELECT * FROM jogos "
            );
            
        }else{
            [jogos] = await database.execute(
                "SELECT * FROM jogos WHERE plataforma = ?",
                [plataforma]
            );
            
        }
        
        // 200: operação realizada com sucesso.
        // .json(jogos): envia os registros em formato JSON.
        res.status(200).json(jogos)  
        
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