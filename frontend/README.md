<div align="center">

# Dashboard Gamer — Frontend

**Interface web em HTML, CSS e JavaScript puro (ES Modules) para cadastrar, pesquisar, editar e excluir jogos, consumindo a API do Dashboard Gamer.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Flexbox-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

</div>

---

## Sumário

- [Dashboard Gamer — Frontend](#dashboard-gamer--frontend)
  - [Sumário](#sumário)
  - [1. Sobre o Frontend](#1-sobre-o-frontend)
  - [2. Objetivos](#2-objetivos)
  - [3. Funcionalidades](#3-funcionalidades)
    - [3.1. Login](#31-login)
    - [3.2. Dashboard](#32-dashboard)
    - [3.3. Gerenciamento de jogos](#33-gerenciamento-de-jogos)
    - [3.4. Edição](#34-edição)
    - [3.5. Pesquisa](#35-pesquisa)
  - [4. Arquitetura](#4-arquitetura)
    - [Responsabilidade dos arquivos](#responsabilidade-dos-arquivos)
  - [5. Tecnologias e Dependências](#5-tecnologias-e-dependências)
  - [6. Módulos JavaScript](#6-módulos-javascript)
    - [`script.js`](#scriptjs)
    - [`validar.js`](#validarjs)
    - [`gameCard.js`](#gamecardjs)
    - [`mostrarJogos.js`](#mostrarjogosjs)
    - [`pesquisar.js`](#pesquisarjs)
    - [`editGame.js`](#editgamejs)
  - [7. Integração com a API](#7-integração-com-a-api)
  - [8. Validações e Regras de Negócio](#8-validações-e-regras-de-negócio)
  - [9. Pré-requisitos](#9-pré-requisitos)
  - [10. Como Executar](#10-como-executar)
    - [10.1. Subir o backend](#101-subir-o-backend)
    - [10.2. Servir o frontend](#102-servir-o-frontend)
    - [10.3. Usar](#103-usar)
  - [11. Fluxo do Sistema](#11-fluxo-do-sistema)
    - [Fluxo de carregamento](#fluxo-de-carregamento)
    - [Fluxo de adição / edição](#fluxo-de-adição--edição)
  - [12. Status do Frontend](#12-status-do-frontend)
    - [Implementado](#implementado)
    - [Pendências conhecidas](#pendências-conhecidas)
    - [Fora do escopo da versão atual](#fora-do-escopo-da-versão-atual)
  - [13. Licença](#13-licença)

---

## 1. Sobre o Frontend

O frontend do **Dashboard Gamer** é uma aplicação de páginas estáticas executada no navegador, **sem framework e sem etapa de build**.

Ele possui duas telas:

- **Login:** identifica o jogador por username e e-mail;
- **Dashboard:** formulário de cadastro, painel de perfil, pesquisa e lista de jogos em cards.

Os dados dos jogos vêm do [backend](../backend/README.md) (`http://localhost:3000/api/jogos`). O navegador guarda apenas o usuário "logado" no `localStorage`.

---

## 2. Objetivos

- Construir uma interface com HTML semântico e CSS (Flexbox);
- Modularizar o JavaScript com **ES Modules** (`import` / `export`);
- Consumir uma API REST com `fetch` e `async/await`;
- Criar elementos dinamicamente com a DOM API;
- Usar **delegação de eventos** na lista de cards;
- Validar entradas do usuário antes de enviar ao servidor;
- Separar responsabilidades: API, validação, renderização e eventos.

---

## 3. Funcionalidades

### 3.1. Login

- Campos de **username** e **e-mail**;
- Validação antes de entrar (campos vazios e e-mail sem `.com`; o `type="email"` do HTML valida o formato);
- Usuário salvo no `localStorage` na chave `user`;
- Redirecionamento para o dashboard.

> É apenas uma identificação local, sem autenticação de verdade.

---

### 3.2. Dashboard

O dashboard é dividido em dois blocos:

**Perfil do jogador**

- Nome do usuário (lido do `localStorage`; exibe `none user` se não houver);
- Espaços reservados para **XP**, **level** e **conquistas**;
- Formulário de cadastro/edição de jogo.

**Jogos**

- Campo de pesquisa;
- Lista de cards com os jogos cadastrados.

---

### 3.3. Gerenciamento de jogos

O sistema permite:

- Adicionar jogo (nome, horas jogadas, plataforma);
- Editar um jogo existente;
- Excluir jogo, com confirmação (`confirm`);
- Atualizar a lista automaticamente após cada operação;
- Limpar o formulário após salvar.

Cada **card** exibe:

```text
capa
nome
horas jogadas
plataforma
botão Editar
botão Excluir
```

Plataformas disponíveis no formulário:

```text
PS1 · PS2 · PS3 · PS4 · PSP · PS VITA · PC
XBOX · XBOX 360 · XBOX ONE · XBOX SERIES
N. SWITCH · N. SWITCH 2
```

---

### 3.4. Edição

O botão **Editar** do card:

1. Localiza o jogo na lista local pelo `id`;
2. Preenche o formulário com nome, horas e plataforma;
3. Coloca a tela em **modo de edição** (`jogoEmEdicao = id`);
4. Ao clicar no botão do formulário, envia um `PUT` em vez de um `POST`.

---

### 3.5. Pesquisa

A pesquisa roda a cada digitação (`input`) e filtra a lista **localmente**.

| Situação | Mensagem / comportamento |
|:---|:---|
| Campo vazio | "Digite um jogo." e exibe todos os jogos |
| Menos de 3 caracteres | "Digite pelo menos 3 caracteres." |
| Nenhum resultado | "Nenhum jogo encontrado ;(" |
| 3 ou mais caracteres | Filtra pelo nome, ignorando maiúsculas/minúsculas |

---

## 4. Arquitetura

```text
frontend/
│
├── assets/
│   ├── css/
│   │   ├── LoginStyle.css
│   │   └── style.css
│   └── gameImageCover.webp
│
├── dashboard/
│   └── dashboard.html
│
├── js/
│   ├── api/
│   │   └── jogosApi.js
│   ├── modules/
│   │   ├── editGame.js
│   │   ├── gameCard.js
│   │   ├── mostrarJogos.js
│   │   ├── pesquisar.js
│   │   ├── render.js
│   │   ├── script.js
│   │   └── storage.js
│   └── utils/
│       └── validar.js
│
├── auth.js
├── index.html
└── README.md
```

### Responsabilidade dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Tela de login |
| `auth.js` | Validação do login e gravação do usuário no `localStorage` |
| `dashboard/dashboard.html` | Tela principal (perfil, formulário, pesquisa e lista) |
| `js/modules/script.js` | Ponto de entrada: estado, eventos e orquestração |
| `js/api/jogosApi.js` | Funções `fetch` para a API do backend |
| `js/utils/validar.js` | Validação do formulário e checagem de duplicidade |
| `js/modules/gameCard.js` | Criação do card de um jogo |
| `js/modules/mostrarJogos.js` | Limpa a lista e renderiza todos os cards |
| `js/modules/pesquisar.js` | Filtro de pesquisa por nome |
| `js/modules/editGame.js` | Preenche o formulário para edição |
| `js/modules/render.js` | Reservado para XP, conquistas, total de horas e quantidade (ainda vazio) |
| `js/modules/storage.js` | Helpers de `localStorage` para jogos (não utilizado após a integração com a API) |
| `assets/css/style.css` | Estilo do dashboard |
| `assets/css/LoginStyle.css` | Estilo do login |

---

## 5. Tecnologias e Dependências

O frontend **não possui dependências instaladas** (sem `npm`, sem bundler).

| Recurso | Finalidade |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 (Flexbox) | Layout |
| JavaScript — ES Modules | Lógica da aplicação |
| `fetch` API | Requisições ao backend |
| `localStorage` | Usuário logado |
| DOM API | Criação de cards e eventos |
| Devicon (CDN) | Ícones do GitHub e LinkedIn |
| Google Fonts — MuseoModerno | Fonte do dashboard |

---

## 6. Módulos JavaScript

### `script.js`

Controla o estado e os eventos da tela.

| Elemento | Descrição |
|---|---|
| `listaDeJogos` | Array com os jogos carregados da API |
| `jogoEmEdicao` | `null` no cadastro; recebe o `id` no modo de edição |
| `adicionarDados()` | Valida, verifica duplicidade e chama `cadastrarJogo` |
| `salvarEdicao()` | Chama `atualizarJogo` com os dados do formulário |
| `inicializarJogos()` | Carrega os jogos ao abrir a página |
| `resetarTela()` | Recarrega a lista da API, redesenha os cards e limpa o formulário |
| `exibrUser()` | Mostra o nome do usuário salvo no `localStorage` |

Eventos registrados:

| Evento | Ação |
|---|---|
| `click` em `#btn` | Cadastra ou salva edição, conforme `jogoEmEdicao` |
| `input` em `#pesquisaInput` | Filtra os jogos |
| `load` da janela | Carrega os jogos da API |
| `click` em `.editarBtn` (delegado) | Entra em modo de edição |
| `click` em `.excluirBtn` (delegado) | Confirma e exclui o jogo |

### `validar.js`

| Função | Descrição |
|---|---|
| `validar(game, horas, select)` | Verifica tipos, campos vazios, horas válidas e plataforma selecionada |
| `jogoExiste(nome, array)` | Impede nomes duplicados (sem diferenciar maiúsculas de minúsculas) |

### `gameCard.js`

`criarCard(jogo)` monta o card com a DOM API e devolve o elemento, com botões `Editar` e `Excluir` que guardam o `id` em `data-id`.

### `mostrarJogos.js`

`mostrarJogos(array)` limpa `#lista` e adiciona um card para cada jogo.

### `pesquisar.js`

`pesquisar(input, array, mensagem)` aplica as regras de pesquisa descritas na seção 3.5.

### `editGame.js`

`editarGame(array, id, horas, jogo, select)` preenche o formulário; a plataforma é localizada comparando o **texto** da opção do `select` com o valor salvo.

---

## 7. Integração com a API

Arquivo: `js/api/jogosApi.js`. URL base fixa: `http://localhost:3000/api/jogos`.

| Função | Método | Rota | Descrição |
|---|:---:|---|---|
| `listarJogos()` | `GET` | `/api/jogos` | Retorna o array de jogos |
| `cadastrarJogo(jogo)` | `POST` | `/api/jogos` | Cria um jogo |
| `atualizarJogo(id, dados)` | `PUT` | `/api/jogos/:id` | Altera um jogo |
| `deletarJogo(id)` | `DELETE` | `/api/jogos/:id` | Exclui um jogo |

Objeto enviado no `POST` e no `PUT`:

```json
{
  "nome": "The Witcher 3",
  "horas_jogadas": 120.5,
  "plataforma": "PC"
}
```

> A **plataforma** é enviada como o **texto visível** da opção (ex.: `N. SWITCH`), não como o `value` do `select` (`switch`).

Em caso de erro, as funções registram no console e relançam a exceção; em `cadastrarJogo` a mensagem inclui o status HTTP e o corpo da resposta, o que ajuda na depuração.

---

## 8. Validações e Regras de Negócio

| Regra | Comportamento |
|---|---|
| Nome vazio | Alerta "valores vazios são inválidos" |
| Plataforma não selecionada | Alerta "selecione a plataforma !!" |
| Horas negativas ou inválidas | Alerta e cancelamento do envio |
| Nome duplicado | Alerta "esse jogo já existe !!" (só no cadastro, não na edição) |
| Tamanho do nome | `maxlength="50"` no campo (o backend aceita até 120) |
| Exclusão | Pede confirmação antes de enviar o `DELETE` |
| Pesquisa | Mínimo de 3 caracteres |
| Login | Username e e-mail obrigatórios |

A validação do frontend melhora a experiência, mas a validação definitiva é feita pelo backend.

---

## 9. Pré-requisitos

Para executar o frontend, é necessário possuir:

- Navegador moderno (suporte a ES Modules);
- Um servidor HTTP estático (ex.: extensão **Live Server** do VS Code, ou `npx serve`);
- O [backend](../backend/README.md) em execução em `http://localhost:3000`.

> Abrir os arquivos direto pelo sistema (`file://`) **não funciona**, pois os navegadores bloqueiam `<script type="module">` nesse modo.

---

## 10. Como Executar

### 10.1. Subir o backend

Siga o [`backend/README.md`](../backend/README.md) e confirme que a API responde em `http://localhost:3000/api/jogos`.

### 10.2. Servir o frontend

Com o **Live Server** do VS Code: clique com o botão direito em `frontend/index.html` → **Open with Live Server**.

Ou pelo terminal:

```bash
cd DASHBOARD_GAMER/frontend
npx serve .
```

### 10.3. Usar

1. Abra a tela de login;
2. Informe username e e-mail;
3. Cadastre jogos no formulário do dashboard.

> Se o login não abrir o dashboard, veja a pendência de caminho em [Status do Frontend](#12-status-do-frontend). Para abrir direto, acesse `/dashboard/dashboard.html`.

---

## 11. Fluxo do Sistema

```text
                    ┌──────────────────┐
                    │  Login (index)   │
                    └────────┬─────────┘
                             │ username + e-mail
                             ▼
                    localStorage ("user")
                             │
                             ▼
                    ┌──────────────────┐
                    │    Dashboard     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          Perfil         Formulário       Lista
        (username)    (add / editar)   (cards + busca)
                             │
                             ▼
                       jogosApi.js
                             │ fetch
                             ▼
                        Backend :3000
```

### Fluxo de carregamento

```text
Página carregada (load)
        │
        ▼
   listarJogos()  ──►  GET /api/jogos
        │
        ▼
 listaDeJogos = resposta
        │
        ▼
  mostrarJogos()  ──►  criarCard() para cada jogo
```

### Fluxo de adição / edição

```text
Clique no botão do formulário
              │
              ▼
     jogoEmEdicao === null ?
        /             \
      sim             não
       │               │
       ▼               ▼
adicionarDados()   salvarEdicao()
       │               │
 validar + duplicidade │
       │               │
       ▼               ▼
  POST /api/jogos   PUT /api/jogos/:id
       └───────┬───────┘
               ▼
          resetarTela()
   (recarrega API, redesenha, limpa)
```

---

## 12. Status do Frontend

**Em desenvolvimento.**

### Implementado

- [x] Tela de login com validação básica;
- [x] Usuário salvo no `localStorage` e exibido no perfil;
- [x] Listagem de jogos vinda da API;
- [x] Cadastro de jogos;
- [x] Edição de jogos (modo de edição no formulário);
- [x] Exclusão com confirmação;
- [x] Pesquisa em tempo real;
- [x] Validação de formulário e bloqueio de duplicidade;
- [x] Cards criados dinamicamente;
- [x] Delegação de eventos;
- [x] Código modularizado com ES Modules;
- [x] Camada de API separada (`jogosApi.js`).

### Pendências conhecidas

- [ ] **Redirecionamento do login:** `index.html` (atributo `action`) e `auth.js` apontam para `./dashboard/index.html`, mas o arquivo é `dashboard/dashboard.html`. Corrigir os caminhos ou renomear o arquivo;
- [ ] **Cadastro:** depende da correção do `POST` no backend (veja o [README do backend](../backend/README.md#12-status-do-backend));
- [ ] `render.js`: implementar `mostrarXp`, `mostrarConquistas`, `mostrarHoras` e `mostrarQuantidade` (hoje vazias; o import `./gameCard` está sem a extensão `.js`);
- [ ] `storage.js`: remover (não utilizado);
- [ ] Botão do formulário permanece com o texto "ADICIONAR" no modo de edição e não há botão para cancelar a edição;
- [ ] Remover os `console.log` de depuração;
- [ ] Validar e-mail do login com uma regra mais completa;
- [ ] URL da API centralizada em uma constante (hoje repetida em `jogosApi.js`);
- [ ] Atributo `name="sername"` no campo de username do login (provável erro de digitação);
- [ ] Link do LinkedIn no rodapé do login sem `https://`;
- [ ] Rótulo `XOBX ONE` no `select` de plataformas (digitação);
- [ ] Revisar responsividade em telas pequenas.

### Fora do escopo da versão atual

- [ ] Autenticação real;
- [ ] Capa individual por jogo;
- [ ] Filtro e ordenação pela interface (a API já aceita `plataforma` e `ordem`);
- [ ] Testes automatizados;
- [ ] Deploy.

---

## 13. Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [`LICENSE`](../LICENSE) para obter o texto completo da licença.

---

<div align="center">

**Dashboard Gamer — Frontend**

Desenvolvido por **Samuel**.

</div>