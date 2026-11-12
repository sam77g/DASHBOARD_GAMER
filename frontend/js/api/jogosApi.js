// INTERLIGAÇÃO COM A API DO BACKEND
// jogosApi.js

const API_URL = "https://dashboard-gamer.onrender.com/api/jogos"; // API do backend presente no Render
/*
Função para listar os jogos
Comunica com a API fazendo uma requisição GET /api/jogos 
*/
export async function listarJogos() {
    try {
        // comunicando com a API
        const response = await fetch(API_URL);

        // Se a resposta do backend for diferente de 200 ele para e exibe o erro no console
        if (!response.ok) {
            throw new Error("Erro ao consultar a API");
        }

        // Transforma a resposta do backend em JSON e sala em jogos
        const jogos = await response.json();

        return jogos; // retorna os jogos presentes no banco de dados

    } catch (error) {
        console.error("Erro ao listar jogos:", error);
        throw error;  // para caso der erro 
    }
}

// Função assíncrona para o cadastro do jogo utilizando POST
export async function cadastrarJogo(jogo) {
    try {
        // comunicação com a API
        const response = await fetch(API_URL, {
            method: "POST", // informa o método
            headers: {
                "Content-Type": "application/json" // informa o tipo 
            },
            body: JSON.stringify(jogo)
        });

        // Captura a resposta do backend, mesmo quando ocorre um erro
        const resposta = await response.text();

        let resultado;

        try {
            resultado = JSON.parse(resposta);
        } catch {
            resultado = resposta;
        }

        // Exibe o status HTTP e a mensagem real do backend
        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${JSON.stringify(resultado)}`
            );
        }

        console.log("Jogo cadastrado:", resultado);

        return resultado;

    } catch (error) {
        console.error("Erro ao cadastrar jogo:", error);
        throw error;
    }
}

// Função assíncrona para atualizar o jogo
export async function atualizarJogo(id, novosDados) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT", // informa o método
            headers: {
                "Content-Type": "application/json" // informa o tipo 
            },
            body: JSON.stringify(novosDados) // converte o objeto para JSON
        });

        if (!response.ok) {
            throw new Error("Erro ao consultar a API");
        }

        const resultado = await response.json();

        return resultado

    } catch (error) {
        console.error("Erro ao atualizar o jogo :", error);
        throw error;
    }
}

// Função para deletar o jogo a partir do id utilizando o método DELETE
export async function deletarJogo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE", // informa o método
        })

        // Caso ter erro 
        if (!response.ok) {
            throw new Error("Erro ao deletar o jogo");
        }

        // Mostra no console o erro 
        console.log("Jogo deletado com sucesso");

    } catch (error) {
        console.error("Erro ao deletar jogo:", error);
        throw error;
    }
}

