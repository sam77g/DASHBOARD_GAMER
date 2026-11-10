// editGame.js - Arquivo com a função de editar os jogos
// funcionalidade não completada
export function editarGame(array, id, horas, jogo, selectPlataforma) {

    const jogoEncontrado = array.find(jogo => jogo.id === id);

    if (!jogoEncontrado) {
        return false;
    }

    // Preencha os campos do formulário com os dados encontrados.
    let nome = jogo.value
    let horas_jogadas = Number(horas)
    let plataforma = selectPlataforma.options[selectPlataforma.selectedIndex].text

    

    return true;
}