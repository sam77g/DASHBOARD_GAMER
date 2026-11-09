// CONTROLLER
// FARÁ A CONEXÃO COM database.js
// realizará as consultas SQL com node.js
// req.query	Parâmetros de consulta	?plataforma=PC
// req.params	Parâmetros da rota	/api/jogos/6
// req.body	Dados enviados no corpo	JSON do POST

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

async function cadastrarJogo(req, res) {
    try {
        let { nome, horas_jogadas, plataforma } = req.body
        let parametros = [];

        // lembrar de impletar a verificação de nomes vazios
        if ((!nome || nome.trim().toUpperCase() == '') || (typeof horas_jogadas !== "number" || !Number.isFinite(horas_jogadas) || horas_jogadas < 0) || !plataforma) {
            return res.status(400).json({ mensagem: "nome ,horas e plataforma vazias/inválidas" })
        } else {
            parametros.push(nome, horas_jogadas, plataforma)
        }

        const [resultado] = await database.execute(
            "INSERT INTO jogos (nome, horas_jogadas, plataforma) VALUES (?,?,?)",
            parametros
        );

        res.status(201).json({
            mensagem: "Jogo cadastrado com sucesso",
            id: resultado.insertId
        })

    } catch (error) {
        console.error("Erro ao cadastrar o jogo:", error);
        res.status(500).json({
            mensagem: "Erro interno ao cadastrar o jogo."
        });
    }
}

async function buscarJogoPorId(req, res) {
    try {
        let { id } = req.params;

        // faz a consulta e guarda em [resultado]
        const [resultado] = await database.execute(
            "SELECT * FROM jogos WHERE id = ?",
            [id]
        );

        // verifica se o [resultado] está vazio, se está significa que não há nenhum com o id solicitado
        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: "Jogo não encontrado"
            });
        }

        return res.status(200).json(resultado[0]);

    } catch (error) {
        console.error("Erro ao buscar o jogo:", error);
        res.status(500).json({
            mensagem: "Erro interno ao buscar o jogo."
        });
    }
}
async function editarJogo(req, res) {
    try {
        let { id } = req.params;
        let { nome, horas_jogadas, plataforma } = req.body
        let parametros = [];

        const [resultadoId] = await database.execute(
            "SELECT * FROM jogos WHERE id = ?",
            [id]
        );

        // verifica se o [resultado] está vazio, se está significa que não há nenhum com o id solicitado
        if (resultadoId.length === 0) {
            return res.status(404).json({
                mensagem: "Jogo não encontrado"
            });
        }


        // lembrar de impletar a verificação de nomes vazios
        if ((!nome || nome.trim().toUpperCase() == '') || (typeof horas_jogadas !== "number" || !Number.isFinite(horas_jogadas) || horas_jogadas < 0) || !plataforma) {
            return res.status(400).json({ mensagem: "nome ,horas e plataforma vazias/inválidas" })
        } else {
            parametros.push(nome, horas_jogadas, plataforma, id)
        }


        const [resultado] = await database.execute(
            "UPDATE jogos SET nome = ?, horas_jogadas = ?, plataforma = ? WHERE id = ?",
            parametros
        );

        res.status(200).json(resultado)
    } catch (error) {
        console.error("Erro ao alterar o jogo:", error);
        res.status(500).json({
            mensagem: "Erro interno ao alterar o jogo."
        });
    }

}
module.exports = {
    listarJogos,
    cadastrarJogo,
    buscarJogoPorId,
    editarJogo
};