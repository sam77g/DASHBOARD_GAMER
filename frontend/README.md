<div align="center">

# Dashboard Gamer — Frontend

**Interface web em HTML, CSS e JavaScript puro (ES Modules) para cadastrar, pesquisar, editar e excluir jogos, consumindo a API do Dashboard Gamer.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Flexbox-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)
![Deploy](https://img.shields.io/badge/deploy-Netlify-00C7B7?logo=netlify&logoColor=white)
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

Os dados dos jogos vêm do [backend](../backend/README.md), que é a única parte que conversa com o banco de dados. O navegador guarda apenas o usuário "logado" no `localStorage`.

| Ambiente | URL |
|---|---|
| Frontend publicado (Netlify) | `https://dashboardgamer.netlify.app` |
| API usada pelo frontend (Render) | `https://dashboard-gamer.onrender.com/api/jogos` |

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
- Redirecionamento para `./dashboard/dashboard.html`.

> É apenas uma identificação local, sem autenticação de verdade.

---

### 3.2. Dashboard

O dashboard é dividido em dois blocos:

**Perfil do jogador**

- Nome do usuário (lido do `localStorage`; exibe `none user` se não houver);
- Área reservada para **conquistas** (`#conquistas`, ainda vazia); **XP** e **level** ainda não têm elementos na página;
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

Plataformas disponíveis no formulário (o texto visível da opção é o valor salvo no banco):

```text
PlayStation : PS1 · PS2 · PS3 · PS4 · PS5 · PSP · PS VITA
Xbox        : XBOX Classic · XBOX 360 · XBOX ONE · XBOX SERIES S/X
PC          : PC (Windows) · Mac · Linux
Nintendo    : NES · SNES · Nintendo 64 · GameCube · Wii · Wii U
              Game Boy · Game Boy Advance · Nintendo DS · Nintendo 3DS
              N. SWITCH · N. SWITCH 2
Sega        : Master System · Mega Drive / Genesis · Sega Saturn
              Dreamcast · Game Gear
Outros      : Atari 2600 · Neo Geo · Android · iOS · Arcade / Fliperama
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
│   │   └── script.js
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

Arquivo: `js/api/jogosApi.js`. A URL base fica em uma constante no topo do arquivo e **aponta para a API em produção**:

```js
const API_URL = "https://dashboard-gamer.onrender.com/api/jogos";
```

Para desenvolver contra o backend local, troque temporariamente por `http://localhost:3000/api/jogos` (e não versione essa alteração).

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

Em caso de erro, as funções registram no console e relançam a exceção; em `cadastrarJogo` a mensagem inclui o status HTTP e o corpo da resposta, o que ajuda na depuração. Hoje apenas a exclusão exibe um alerta ao usuário quando falha; erros de cadastro e edição aparecem só no console (veja as pendências).

### CORS

Como o frontend e a API ficam em domínios diferentes, o navegador só aceita as respostas se a origem da página estiver em `origensPermitidas` no backend ([seção 8.1 do README do backend](../backend/README.md#81-cors)). Hoje são permitidas:

- `https://dashboardgamer.netlify.app` (produção);
- `http://localhost:5500` (Live Server).

Se a página abrir em `http://127.0.0.1:5500` ou em outra porta (ex.: `npx serve`), o navegador bloqueia as requisições com erro de CORS no console. Acesse por `http://localhost:5500` ou adicione a origem no backend.

---

## 8. Validações e Regras de Negócio

| Regra | Comportamento |
|---|---|
| Nome vazio | Alerta "valores vazios são inválidos" |
| Plataforma não selecionada | Alerta "selecione a plataforma !!" |
| Horas negativas ou inválidas | Alerta e cancelamento do envio |
| Nome duplicado | Alerta "esse jogo já existe !!" (só no cadastro, não na edição) |
| Tamanho do nome | `maxlength="50"` no campo (o backend aceita até 120; os dois limites ainda não coincidem) |
| Exclusão | Pede confirmação antes de enviar o `DELETE` |
| Pesquisa | Mínimo de 3 caracteres |
| Login | Username e e-mail obrigatórios |

A validação do frontend melhora a experiência, mas a validação definitiva é feita pelo backend.

---

## 9. Pré-requisitos

Para executar o frontend, é necessário possuir:

- Navegador moderno (suporte a ES Modules);
- Um servidor HTTP estático na porta **5500** (ex.: extensão **Live Server** do VS Code);
- Uma API acessível: a de produção (já configurada em `jogosApi.js`) ou o [backend](../backend/README.md) local em `http://localhost:3000`.

> Abrir os arquivos direto pelo sistema (`file://`) **não funciona**, pois os navegadores bloqueiam `<script type="module">` nesse modo.

---

## 10. Como Executar

### 10.1. Escolher a API

- **Produção (padrão):** nenhuma ação; `jogosApi.js` já aponta para `https://dashboard-gamer.onrender.com/api/jogos`;
- **Local:** siga o [`backend/README.md`](../backend/README.md), confirme que `http://localhost:3000/api/jogos` responde e altere `API_URL` em `jogosApi.js`.

### 10.2. Servir o frontend

Com o **Live Server** do VS Code: clique com o botão direito em `frontend/index.html` → **Open with Live Server**. Confirme que o endereço na barra é `http://localhost:5500` (e não `127.0.0.1`), para respeitar o CORS do backend.

> Se preferir `npx serve .`, a porta será outra e precisará ser adicionada às origens permitidas do backend.

### 10.3. Usar

1. Abra a tela de login;
2. Informe username e e-mail;
3. Cadastre jogos no formulário do dashboard.

### 10.4. Publicação (Netlify)

O frontend é um site estático: não há build nem dependências. Em produção ele é publicado no Netlify em `https://dashboardgamer.netlify.app`, e essa origem já está liberada no CORS do backend. Ao publicar em outro domínio, adicione-o a `origensPermitidas` no backend.

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

**Em desenvolvimento — publicado e funcionando em produção.**

### Implementado

- [x] Tela de login com validação básica e redirecionamento para o dashboard;
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
- [x] Camada de API separada (`jogosApi.js`);
- [x] Lista ampliada de plataformas (PlayStation, Xbox, PC, Nintendo, Sega, retrô e mobile);
- [x] Integração com a API em produção (CORS liberado para o domínio do Netlify);
- [x] Deploy no Netlify.

### Pendências conhecidas

Alinhadas às **Etapas 1, 2 e 5** do [roadmap](../docs/ROADMAP.md):

- [ ] **Mostrar erros na interface:** falhas no cadastro e na edição aparecem só no console (`adicionarDados` e `salvarEdicao` não têm `try/catch`) — QL-02;
- [ ] **Alinhar validações com o backend:** `maxlength="50"` no nome (backend aceita 120) e ausência de limite superior para as horas — QL-03;
- [ ] **URL da API configurável:** `API_URL` está fixa no código; separar local e produção — QL-06;
- [ ] `render.js`: implementar `mostrarXp`, `mostrarConquistas`, `mostrarHoras` e `mostrarQuantidade` (hoje vazias; o import `./gameCard` está sem a extensão `.js`; o arquivo ainda não é importado por nenhum módulo) — Etapa 2;
- [ ] Botão do formulário permanece com o texto "ADICIONAR" no modo de edição e não há botão para cancelar a edição;
- [ ] Verificar duplicidade também na edição;
- [ ] Remover os `console.log` de depuração;
- [ ] `index.html`: o atributo `action` do formulário ainda aponta para `./dashboard/index.html` (inofensivo, pois o envio é interceptado por `auth.js`, mas deve ser corrigido);
- [ ] `index.html`: atributo `name="sername"` no campo de username (provável erro de digitação) e link do LinkedIn no rodapé sem `https://`;
- [ ] Validar o e-mail do login com uma regra mais completa;
- [ ] Revisar responsividade em telas pequenas.

### Fora do escopo da versão atual

- [ ] Autenticação real (Etapa 4);
- [ ] Capa individual por jogo;
- [ ] Filtro e ordenação pela interface (a API já aceita `plataforma` e `ordem`);
- [ ] Testes automatizados.

---

## 13. Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [`LICENSE`](../LICENSE) para obter o texto completo da licença.

---

<div align="center">

**Dashboard Gamer — Frontend**

Desenvolvido por **Samuel**.

</div>
