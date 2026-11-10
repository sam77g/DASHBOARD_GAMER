// editGame.js - Arquivo com a função de editar os jogos
// funcionalidade não completada
export function editarGame(array, id, novosDados) {

    const jogoEncontrado = array.find(function (jogo) {
        return jogo.id === id;
    });

    if (!jogoEncontrado) {
        return false;
    }

    // Atualizar os dados do jogo encontrado

    return true;
}