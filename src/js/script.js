// imports
import { mostrarJogos } from "./mostrarJogos.js";
import { editarGame } from "./editGame.js";
import { jogoExiste, validar } from "./validar.js"; // função de validação
import { carregarJogos, salvarJogos } from "./storage.js"; // função de salvar e carregar os jogos
import { criarCard } from "./gameCard.js"; // função para criar os cards dos jogos
import { pesquisar } from "./pesquisar.js";

// Variavéis
// DOM ELEMENTS
const btn = document.querySelector('#btn');
const btnEditar = document.querySelector('#editarBtn'); // botão de editar
// inputs
const pesquisaInput = document.querySelector("#pesquisaInput");
const UserNameInfo = document.querySelector("#usernameInfo");
const jogoInput =  document.querySelector("#nomeDoJogo");
const horasInput = document.querySelector("#horas");
const selectPlataforma = document.querySelector('#plataforma');
const lista = document.querySelector('#lista'); // lista de jogos 
const mensagem = document.querySelector('#mensagem'); // mensagem da lista enquanto digita
let jogoEmEdicao = null;
// DADOS
const usernameString = localStorage.getItem('user');

// ARRAY DE OBJETOS
const listaDeJogos = carregarJogos();
console.log(listaDeJogos);

// funções
function adicionarDados(){
    
    // DOM ELEMENTS 
    const valorSelect = String(selectPlataforma.value)
    const jogo = jogoInput.value ;
    const horasJogadas = Number(horasInput.value)
    const plataforma = selectPlataforma.options[selectPlataforma.selectedIndex].text ;
    const jogoNome = jogo.trim().toLowerCase()
    
    //  validação 
    // verifica se o usuário digitou o nome e as horas jogadas, além de verificar o valor do select
    if(validar(jogo,horasJogadas,valorSelect, listaDeJogos) == true){
        // verifica se o jogo já foi adicionado
        if(jogoExiste(jogoNome,listaDeJogos) === true){
            
            // adicionando os dados em um objeto no array
            listaDeJogos.push({
                jogo,
                horas : horasJogadas,
                plataforma,
                id : listaDeJogos.length
            })
            
            // chamada de função
            salvarJogos(listaDeJogos)
            mostrarJogos(listaDeJogos);
            limparInputs()
            
        }
        
        console.log(listaDeJogos);// debug
        
    }
    
    /*
    como deve ficar o objeto futuramente :
    
    {
        jogo
        horas
        plataforma
        categoria
        desenvolvedora
        nota/avaliação
        }
        
        */
}



// função para limpar inputs
function limparInputs(){
    jogoInput.value = ''
    horasInput.value = ''
    selectPlataforma.value = 'selection' ;
}


// função que exibe o nome do usuário salvo no localStorage
function user(){
    if(usernameString === null ){
        return false
    }else{
        return true
    }
}
// função para exibir o usuário
function exibrUser(){
    if(user()){
        const UserName = JSON.parse(usernameString);
        UserNameInfo.textContent = ` ${UserName.nome} `
    }else{
        UserNameInfo.textContent = `none user`
    }
}




// EVENTOS DO CÓDIGO
exibrUser() // chamada da função para exibir o username

// evento quando o botão adicionar for clicado 
btn.addEventListener('click', ()=>{
    adicionarDados(); // chamada de função
});

// evento enquanto o usário estiver digitando 
pesquisaInput.addEventListener('input', ()=>{
    pesquisar(pesquisaInput, listaDeJogos, mensagem)
});

// quando reiniciar 
window.addEventListener('load', function(event) {
    // mostrar os jogos que já estão em listaDeJogos
    mostrarJogos(listaDeJogos)
    console.log("Página carregou");
}); 

btnEditar.addEventListener('click', ()=>{
    editarGame(listaDeJogos)
})