// INTERLIGAÇÃO COM A API DO BACKEND

async function listarJogos() {
    try {
        const response = await fetch("http://localhost:3000/api/jogos") // faz a requisição
        if (!response.ok) throw new Error("Erro interno ao listar os jogos") // caso a requisição der falha ele para
        const jogos = await response.json() // aqui os dados são convertidos para JSON
        return jogos
    } catch (error) {
        console.error(error); // exibe no console o erro 
        throw error;
    }
}
