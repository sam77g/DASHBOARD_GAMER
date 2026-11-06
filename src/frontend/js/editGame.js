export function editarGame(array, id, novosDados){

    const jogoEncontrado = array.find(function(jogo){
        return jogo.id === id;
    });

    if(!jogoEncontrado){
        return false;
    }

    // Atualizar os dados do jogo encontrado

    return true;
}