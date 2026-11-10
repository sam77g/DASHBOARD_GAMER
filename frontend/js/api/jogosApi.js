// INTERLIGAÇÃO COM A API DO BACKEND
// jogosApi.js
export async function listarJogos() {
    try {
        const response = await fetch("http://localhost:3000/api/jogos");

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
        const response = await fetch("http://localhost:3000/api/jogos", {
            method: "POST", // informa o método
            headers: {
                "Content-Type": "application/json" // informa o tipo 
            },
            body: JSON.stringify(jogo) // converte o objeto para JSON
        });

        if (!response.ok) {
            throw new Error("Erro ao consultar a API");
        }

        const resultado = await response.json();

        return resultado

    } catch (error) {
        console.error("Erro ao cadastrar o jogo :", error);
        throw error;
    }
}

export async function atualizarJogo(id, novosDados) {
    try {
        const response = await fetch(`http://localhost:3000/api/jogos/${id}`, {
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
        const response = await fetch(`http://localhost:3000/api/jogos/${id}`, {
            method: "DELETE", // informa o método
            headers: {
                "Content-Type": "application/json" // informa o tipo 
            }
        })

        if (response.ok) {
            console.log("Jogo deletado com sucesso")
        } else {
            throw new Error("Erro ao consultar a API");
        }

    } catch (error) {
        console.error("Erro ao deletar jogo:", error);
        throw error;
    }
}

