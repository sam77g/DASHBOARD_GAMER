// função para criar os cards dos jogos
export function criarCard(jogo) {
    console.log("criando", jogo.jogo);

    // função auxiliar 
    function dadosChild(dados) {
        return dadosGame.appendChild(dados);;
    }

    // card do jogo 
    let gameCard = criarSection();
    gameCard.className = 'gameCard';

    // filhos do card
    let imgJogo = document.createElement('img');
    imgJogo.src = "../assets/gameImageCover.webp";
    gameCard.appendChild(imgJogo);

    let dadosGame = criarSection();
    dadosGame.className = "dadosGame";
    dadosGame.idGame = `${jogo.id}`
    gameCard.appendChild(dadosGame);

    let titulo = criarTitulo();
    titulo.textContent = `${jogo.jogo}`;
    dadosChild(titulo);

    let horasJogo = criarParagrafo();
    horasJogo.textContent = ` ${jogo.horas} horas`
    dadosChild(horasJogo);

    let plataformaJogo = criarParagrafo();
    plataformaJogo.textContent = `${jogo.plataforma}`
    dadosChild(plataformaJogo);

    let editarBtn = document.createElement('button');

    editarBtn.textContent = 'Editar';
    editarBtn.className = 'editarBtn';
    editarBtn.dataset.id = jogo.id;  // "salva" o id do jogo no botão
    dadosChild(editarBtn);

    return gameCard; // elemento HTML do card

}

// funções auxiliares
function criarParagrafo() {
    return document.createElement('p')
}

function criarTitulo() {
    return document.createElement('h3')
}

function criarSection() {
    return document.createElement('section')
}
