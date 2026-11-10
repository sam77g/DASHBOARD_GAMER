// INTERLIGAÇÃO COM A API DO BACKEND

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


