import { mostrarJogos } from "./mostrarJogos.js";

// função de pesquisa 
export function pesquisar(pesquisaIn, array, mensagem){
    console.log(pesquisaIn)

    const pesquisa = pesquisaIn.value.trim().toLowerCase();
    console.log(pesquisa)
    // filter para pegar o jogo digitado
    const jogoPesquisado =  array.filter(function(jogo){
        return jogo.nome.toLowerCase().includes(pesquisa);
    });

    console.log(jogoPesquisado);

    // validação
    if (pesquisa.trim() === '') {
        mensagem.textContent  = "Digite um jogo.";
        return mostrarJogos(array);
    }
    if (pesquisa.length < 3) {
        mensagem.textContent = "Digite pelo menos 3 caracteres.";
        return;
    }
    if(jogoPesquisado.length === 0){
        mensagem.textContent = 'Nenhum jogo encontrado ;( ';
        return;
    }
    
    mensagem.textContent = "";
    mostrarJogos(jogoPesquisado);

};
