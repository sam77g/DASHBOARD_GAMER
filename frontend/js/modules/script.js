// imports
import { mostrarJogos } from "./mostrarJogos.js";
import { jogoExiste, validar } from "../utils/validar.js"; // função de validação
import { salvarJogos } from "./storage.js"; // função de salvar e carregar os jogos
import { pesquisar } from "./pesquisar.js";
import { cadastrarJogo, listarJogos, atualizarJogo } from "../api/jogosApi.js";
import { editarGame } from "./editGame.js"

// Variavéis
// DOM ELEMENTS
const btn = document.querySelector('#btn');
// const btnEditar = document.querySelector('#editarBtn'); // botão de editar
// inputs
const pesquisaInput = document.querySelector("#pesquisaInput");
const UserNameInfo = document.querySelector("#usernameInfo");
const jogoInput = document.querySelector("#nomeDoJogo");
const horasInput = document.querySelector("#horas");
const selectPlataforma = document.querySelector('#plataforma');
const mensagem = document.querySelector('#mensagem'); // mensagem da lista enquanto digita
let jogoEmEdicao = null;
// DADOS
const usernameString = localStorage.getItem('user');

// ARRAY DE OBJETOS
// const listaDeJogos = carregarJogos();
let listaDeJogos = [];


// funções
async function adicionarDados() {

    // DOM ELEMENTS 
    const valorSelect = String(selectPlataforma.value)
    const jogo = jogoInput.value;
    const horasJogadas = Number(horasInput.value)
    const plataforma = selectPlataforma.options[selectPlataforma.selectedIndex].text;
    const jogoNome = jogo.trim().toLowerCase()


    //  validação 
    // verifica se o usuário digitou o nome e as horas jogadas, além de verificar o valor do select
    if (validar(jogo, horasJogadas, valorSelect, listaDeJogos) == true) {
        // verifica se o jogo já foi adicionado
        if (jogoExiste(jogoNome, listaDeJogos) === false) {

            // chamada de função
            await cadastrarJogo({
                nome: jogo,
                horas_jogadas: horasJogadas,
                plataforma,
            })
            salvarJogos(listaDeJogos)
            mostrarJogos(listaDeJogos);
            limparInputs()

        }



    }

}



// função para limpar inputs
function limparInputs() {
    jogoInput.value = ''
    horasInput.value = ''
    selectPlataforma.value = 'selection';
}


// função que exibe o nome do usuário salvo no localStorage
function user() {
    if (usernameString === null) {
        return false
    } else {
        return true
    }
}

// função para exibir o usuário
function exibrUser() {
    if (user()) {
        const UserName = JSON.parse(usernameString);
        UserNameInfo.textContent = ` ${UserName.nome} `
    } else {
        UserNameInfo.textContent = `none user`
    }
}



async function inicializarJogos() {
    try {
        const jogos = await listarJogos();

        listaDeJogos = jogos;

        mostrarJogos(listaDeJogos);

    } catch (error) {
        console.error("Erro ao inicializar os jogos:", error);
    }
}

async function salvarEdicao() {

    const novosDados = {
        nome: jogoInput.value,
        horas_jogadas: Number(horasInput.value),
        plataforma: selectPlataforma.options[
            selectPlataforma.selectedIndex
        ].text
    };

    await atualizarJogo(jogoEmEdicao, novosDados);

    // Atualizar os dados locais consultando a API
    listaDeJogos = await listarJogos();

    // Atualizar os cards na tela
    mostrarJogos(listaDeJogos);

    // Limpar o formulário
    limparInputs();

    // Sair do modo de edição
    jogoEmEdicao = null;

}



// EVENTOS DO CÓDIGO
exibrUser() // chamada da função para exibir o username

// evento quando o botão adicionar for clicado 
btn.addEventListener('click', async () => {

    if (jogoEmEdicao === null) {
        await adicionarDados();
    } else {
        await salvarEdicao();
    }

});

// evento enquanto o usário estiver digitando 
pesquisaInput.addEventListener('input', () => {
    pesquisar(pesquisaInput, listaDeJogos, mensagem)
});


// quando reiniciar 
window.addEventListener('load', function (event) {
    // mostrar os jogos que já estão em listaDeJogos
    inicializarJogos()
});


lista.addEventListener("click", (event) => {

    const botaoEditar = event.target.closest(".editarBtn");

    if (!botaoEditar) return;

    const id = Number(botaoEditar.dataset.id);

    const editando = editarGame(
        listaDeJogos,
        id,
        horasInput,
        jogoInput,
        selectPlataforma
    );

    if (editando) {
        jogoEmEdicao = id;
        console.log("Editando jogo:", jogoEmEdicao);
    }



});


