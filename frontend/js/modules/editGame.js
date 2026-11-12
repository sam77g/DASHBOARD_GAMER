// frontend/js/editGame.js - Arquivo com a função de editar os jogos
// funcionalidade não completada

export function editarGame(array, id, horas, jogo, selectPlataforma) {

    const jogoEncontrado = array.find(jogo => jogo.id === id); // procura se existe algum jogo correspondende 

    // verifica se o jogo está na lista
    if (!jogoEncontrado) {
        return false;
    }

    // Preencher os inputs
    jogo.value = jogoEncontrado.nome;
    horas.value = jogoEncontrado.horas_jogadas;

    // Localizar a opção correspondente à plataforma
    const opcao = [...selectPlataforma.options].find(
        option => option.text.trim() === jogoEncontrado.plataforma
    );

    if (opcao) {
        selectPlataforma.value = opcao.value;
    }

    return true;
}
