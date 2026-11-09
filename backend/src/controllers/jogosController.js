// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js

const database = require("../config/database");

async function listarJogos(req, res) {
    try {
        const { plataforma, ordem } = req.query; 
        let sql = "SELECT * FROM jogos";
        let parametros = [];
        let condicoes = [];

        // 1. Trata o filtro por plataforma, se ele foi enviado
        if (plataforma) {
            condicoes.push("plataforma = ?");
            parametros.push(plataforma);
        }

        // Se houver condições (WHERE), adiciona na query
        if (condicoes.length > 0) {
            sql += " WHERE " + condicoes.join(" AND ");
        }

        // 2. Trata a ordenação (crescente ou decrescente pelo nome, por exemplo)
        // Nota: Validamos os valores permitidos para evitar injeção de SQL na cláusula ORDER BY
        if (ordem === 'asc' || ordem === 'desc') {
            // Como a palavra ASC/DESC não pode ir direto por parameter binding (?), 
            // validamos estritamente a string para garantir segurança.
            const direcao = ordem === 'asc' ? 'ASC' : 'DESC';
            sql += ` ORDER BY nome ${direcao}`;
        }

        // Executa a consulta no banco de dados com os parâmetros seguros
        const [jogos] = await database.execute(sql, parametros);
        
        // 200: operação realizada com sucesso.
        res.status(200).json(jogos);  
        
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