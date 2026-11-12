// Importando a rederização do card
import { mostrarJogos } from "./mostrarJogos.js";

// função de pesquisa 
export function pesquisar(pesquisaIn, array, mensagem) {
    console.log(pesquisaIn) // mostra no console para debug

    const pesquisa = pesquisaIn.value.trim().toLowerCase();
    console.log(pesquisa)

    // filter para pegar o jogo digitado
    const jogoPesquisado = array.filter(function (jogo) {
        return jogo.nome.toLowerCase().includes(pesquisa);
    });

    console.log(jogoPesquisado); // console para debug do valor

    // validação
    if (pesquisa.trim() === '') { // se for vazio
        mensagem.textContent = "Digite um jogo.";
        return mostrarJogos(array);
    }
    if (pesquisa.length < 3) { // se o tamanho for menor que 3 carcteres
        mensagem.textContent = "Digite pelo menos 3 caracteres.";
        return;
    }
    if (jogoPesquisado.length === 0) { // se não tiver nada digitado
        mensagem.textContent = 'Nenhum jogo encontrado ;( ';
        return;
    }

    mensagem.textContent = ""; // limpa a div
    mostrarJogos(jogoPesquisado); // chama a função para mostrar o jogo pesquisado

};
