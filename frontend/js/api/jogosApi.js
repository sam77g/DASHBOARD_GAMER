// INTERLIGAÇÃO COM A API DO BACKEND
// jogosApi.js

const API_URL = "https://dashboard-gamer.onrender.com/api/jogos";

export async function listarJogos() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao consultar a API");
        }

        const jogos = await response.json();

        return jogos;

    } catch (error) {
        console.error("Erro ao listar jogos:", error);
        throw error;
    }
}


export async function cadastrarJogo(jogo) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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

export async function deletarJogo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE", // informa o método
        })

        if (!response.ok) {
            throw new Error("Erro ao deletar o jogo");
        }

        console.log("Jogo deletado com sucesso");

    } catch (error) {
        console.error("Erro ao deletar jogo:", error);
        throw error;
    }
}

