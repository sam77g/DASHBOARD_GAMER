import { criarCard } from "./gameCard.js";

export function mostrarJogos(array){
    const lista = document.querySelector('#lista'); // lista de jogos 
    console.log(array);
    
    // limpa a div
    lista.innerHTML = '';
    
    // laço de repetição que pecorre o array
    array.forEach(function(jogo){
        let card = criarCard(jogo);
        console.log(jogo);
        lista.appendChild(card);
        console.log(lista.children.length);
    })

}