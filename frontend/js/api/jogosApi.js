// INTERLIGAÇÃO COM A API DO BACKEND

async function listarJogos() {
    fetch("http://localhost:3000/api/jogos")
        .then(reposta => resposta.json())
        .then(dados => {
            console.log(dados)
        })
        .catch(erro => {
            console.error("Erro", erro);
        })
}
