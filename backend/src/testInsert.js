const conexao = require("./config/database");

async function testarInsert() {
    try {
        const sql = `
            INSERT INTO jogos
            (nome, horas_jogadas, plataforma)
            VALUES (?, ?, ?)
        `;

        const valores = [
            "Hollow Knight",
            54,
            "Switch"
        ];

        const [resultado] = await conexao.execute(sql, valores);

        console.log("Jogo cadastrado!");
        console.log("ID gerado:", resultado.insertId);

    } catch (erro) {
        console.error("Erro:", erro.message);

    } finally {
        await conexao.end();
    }
}

testarInsert();