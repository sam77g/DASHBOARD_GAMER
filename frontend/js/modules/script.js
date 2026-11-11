// imports
import { mostrarJogos } from "./mostrarJogos.js";
import { jogoExiste, validar } from "../utils/validar.js"; // função de validação
import { pesquisar } from "./pesquisar.js";
import { cadastrarJogo, listarJogos, atualizarJogo, deletarJogo } from "../api/jogosApi.js";
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

        if (jogoExiste(jogoNome, listaDeJogos) === false) {

            try {
                console.log("Dados enviados:", {
                    nome: jogo,
                    horas_jogadas: horasJogadas,
                    plataforma
                });

                await cadastrarJogo({
                    nome: jogo,
                    horas_jogadas: horasJogadas,
                    plataforma
                });

                await resetarTela();

            } catch (error) {
                console.error("Falha no processo de cadastro:", error);
                alert(`Não foi possível cadastrar o jogo: ${error.message}`);
            }
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

    resetarTela();

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


lista.addEventListener("click", async (event) => {
    const botaoDelete = event.target.closest(".excluirBtn");

    if (!botaoDelete) return;

    const id = Number(botaoDelete.dataset.id);

    const confirmar = confirm("Deseja realmente excluir este jogo?");

    if (!confirmar) return;
    try {
        await deletarJogo(id);
        await resetarTela();

    } catch (error) {
        console.error("Não foi possível excluir o jogo:", error);
        alert("Erro ao excluir o jogo.");
    }

})

async function resetarTela() {
    // Atualizar os dados locais consultando a API
    listaDeJogos = await listarJogos();

    // Atualizar os cards na tela
    mostrarJogos(listaDeJogos);

    // Limpar o formulário
    limparInputs();
}


