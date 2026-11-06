const conexao = require("./config/database");

async function testarConexao() {
    try {
        const [resultado] = await conexao.query(
            "SELECT NOW() AS data_atual"
        );

        console.log("Conexão com MySQL estabelecida!");
        console.log(resultado);

    } catch (erro) {
        console.error("Erro ao conectar:", erro.message);

    } finally {
        await conexao.end();
    }
}

testarConexao();