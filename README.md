<div align="center">

# DASHBOARD GAMER

**Dashboard fullstack para registrar e organizar sua biblioteca de jogos, com horas jogadas e plataforma, desenvolvido com HTML, CSS, JavaScript, Node.js, Express e MySQL.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-compat%C3%ADvel-4479A1?logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)
![Frontend](https://img.shields.io/badge/frontend-Netlify-00C7B7?logo=netlify&logoColor=white)
![Backend](https://img.shields.io/badge/backend-Render-46E3B7?logo=render&logoColor=white)
![Banco](https://img.shields.io/badge/banco-TiDB%20Cloud-FF7000)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

</div>

---

## Sumário

1. [Sobre o Projeto](#1-sobre-o-projeto)
2. [Objetivos](#2-objetivos)
3. [Funcionalidades](#3-funcionalidades)
4. [Arquitetura do Projeto](#4-arquitetura-do-projeto)
5. [Tecnologias e Dependências](#5-tecnologias-e-dependências)
6. [Banco de Dados](#6-banco-de-dados)
7. [API REST](#7-api-rest)
8. [Regras de Negócio](#8-regras-de-negócio)
9. [Pré-requisitos](#9-pré-requisitos)
10. [Como Executar](#10-como-executar)
11. [Fluxo do Sistema](#11-fluxo-do-sistema)
12. [Status do Projeto](#12-status-do-projeto)
13. [Contribuição](#13-contribuição)
14. [Licença](#14-licença)

---

## 1. Sobre o Projeto

O **Dashboard Gamer** é uma aplicação web **fullstack** onde o jogador cadastra os jogos que possui, informa as horas jogadas e a plataforma, e acompanha tudo em uma interface de cards com pesquisa em tempo real.

O projeto é dividido em duas partes independentes:

- **Frontend:** páginas HTML/CSS e módulos JavaScript (ES Modules) executados no navegador, sem build e sem framework;
- **Backend:** API REST em **Node.js + Express**, com persistência em **MySQL**.

A comunicação entre as partes é feita via `fetch`, trocando JSON com a API em `/api/jogos`. O frontend **não acessa o banco diretamente**: toda operação passa pela API.

O projeto está **publicado**:

| Parte | Hospedagem | Endereço |
|---|---|---|
| Frontend | Netlify | `https://dashboardgamer.netlify.app` |
| Backend (API) | Render | `https://dashboard-gamer.onrender.com/api/jogos` |
| Banco de dados | TiDB Cloud (compatível com MySQL) | acesso apenas pela API, via TLS |

> **Observação:** diferente das versões anteriores do projeto (que salvavam os jogos no `localStorage`), os jogos agora são **persistidos no banco de dados**. O `localStorage` é usado apenas para guardar o usuário "logado" (nome e e-mail).

Documentação detalhada de cada parte:

- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)
- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — panorama atual e próximas etapas

---

## 2. Objetivos

O desenvolvimento do Dashboard Gamer tem como principais objetivos:

- Construir uma aplicação fullstack completa, do banco de dados à interface;
- Implementar um **CRUD** completo (criar, listar, buscar, editar e excluir);
- Praticar a arquitetura em camadas no backend (rotas, controllers, configuração);
- Consumir uma API REST com `fetch` e `async/await`;
- Modularizar o frontend com **ES Modules**;
- Manipular o DOM dinamicamente (criação de cards, eventos delegados);
- Aplicar validação de dados tanto no cliente quanto no servidor;
- Utilizar consultas SQL parametrizadas para evitar SQL Injection;
- Praticar layout responsivo com Flexbox;
- Restringir o acesso à API com **CORS**;
- Publicar uma aplicação fullstack com serviços separados (Netlify, Render e TiDB Cloud).

---

## 3. Funcionalidades

### 3.1. Login

- Tela de login com **username** e **e-mail**;
- Validação básica dos campos antes de entrar;
- Dados do usuário salvos no `localStorage`;
- O nome do usuário é exibido no painel de perfil do dashboard.

> O login é **apenas visual** (identificação local). Não há senha, sessão ou autenticação no servidor: **qualquer pessoa que conheça a API consegue consultar e modificar os jogos**, e todos os usuários compartilham a mesma biblioteca. Isso será resolvido na Etapa 4 do [roadmap](./docs/ROADMAP.md).

---

### 3.2. Gerenciamento de jogos

O sistema permite:

- Cadastrar jogos;
- Listar todos os jogos;
- Editar nome, horas jogadas e plataforma;
- Excluir jogos (com confirmação);
- Pesquisar jogos pelo nome em tempo real;
- Impedir nomes duplicados (verificação no frontend);
- Validar os dados no frontend e no backend.

Cada jogo possui as informações:

```text
id
nome
horas_jogadas
plataforma
criado_em
atualizado_em
```

Plataformas disponíveis:

- **PlayStation:** PS1, PS2, PS3, PS4, PS5, PSP, PS VITA
- **Xbox:** XBOX Classic, XBOX 360, XBOX ONE, XBOX SERIES S/X
- **PC:** PC (Windows), Mac, Linux
- **Nintendo:** NES, SNES, Nintendo 64, GameCube, Wii, Wii U, Game Boy, Game Boy Advance, Nintendo DS, Nintendo 3DS, N. SWITCH, N. SWITCH 2
- **Sega:** Master System, Mega Drive / Genesis, Sega Saturn, Dreamcast, Game Gear
- **Outros:** Atari 2600, Neo Geo, Android, iOS, Arcade / Fliperama

---

### 3.3. Pesquisa

A pesquisa filtra os cards conforme o usuário digita.

| Situação | Comportamento |
|:---|:---|
| Campo vazio | Exibe todos os jogos |
| Menos de 3 caracteres | Pede para digitar pelo menos 3 caracteres |
| Sem resultados | Exibe "Nenhum jogo encontrado" |
| 3 ou mais caracteres | Filtra pelo nome (sem diferenciar maiúsculas de minúsculas) |

---

### 3.4. Filtro e ordenação na API

A rota de listagem aceita parâmetros opcionais:

```text
GET /api/jogos?plataforma=PC&ordem=asc
```

- `plataforma`: filtra por plataforma;
- `ordem`: ordena por nome (`asc` ou `desc`).

---

### 3.5. Perfil do jogador

O painel de perfil exibe o nome do usuário logado. **XP**, **level**, **conquistas** e as estatísticas da biblioteca (total de jogos e de horas) ainda não foram implementados: são a Etapa 2 do [roadmap](./docs/ROADMAP.md) e poderão ser calculados a partir dos jogos já cadastrados.

---

## 4. Arquitetura do Projeto

A aplicação foi dividida em duas camadas independentes (frontend e backend), cada uma com seus módulos.

```text
DASHBOARD_GAMER/
│
├── backend/
│   ├── database/
│   │   └── schema.sql
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── jogosController.js
│   │   ├── routes/
│   │   │   └── jogosRoutes.js
│   │   ├── services/
│   │   │   └── jogosService.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── LoginStyle.css
│   │   │   └── style.css
│   │   └── gameImageCover.webp
│   ├── dashboard/
│   │   └── dashboard.html
│   ├── js/
│   │   ├── api/
│   │   │   └── jogosApi.js
│   │   ├── modules/
│   │   │   ├── editGame.js
│   │   │   ├── gameCard.js
│   │   │   ├── mostrarJogos.js
│   │   │   ├── pesquisar.js
│   │   │   ├── render.js
│   │   │   └── script.js
│   │   └── utils/
│   │       └── validar.js
│   ├── auth.js
│   ├── index.html
│   └── README.md
│
├── docs/
│   └── ROADMAP.md
│
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

### Responsabilidade das partes

| Parte | Responsabilidade |
|---|---|
| `frontend/` | Interface, validação no cliente, consumo da API |
| `backend/src/routes` | Definição dos endpoints |
| `backend/src/controllers` | Regras de negócio, validação e consultas SQL |
| `backend/src/server.js` | Servidor Express, CORS restrito e porta (`PORT`) |
| `backend/src/config` | Conexão (pool) com o MySQL/TiDB, com TLS opcional |
| `backend/database` | Script de criação do banco e da tabela |
| `docs/` | Documentação de planejamento (roadmap) |

A separação entre frontend e backend permite evoluir cada parte de forma independente.

---

## 5. Tecnologias e Dependências

### Frontend

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 (Flexbox) | Estilo e layout |
| JavaScript (ES Modules) | Lógica, DOM e consumo da API |
| `fetch` API | Comunicação com o backend |
| `localStorage` | Guardar o usuário logado |
| Devicon (CDN) | Ícones do GitHub e LinkedIn |
| Google Fonts — MuseoModerno | Tipografia do dashboard |

### Hospedagem

| Serviço | Uso |
|---|---|
| Netlify | Frontend estático |
| Render | API Node.js / Express |
| TiDB Cloud | Banco MySQL compatível (conexão TLS) |

### Backend

| Biblioteca | Finalidade |
|---|---|
| `express` | Servidor HTTP e rotas |
| `mysql2` | Conexão com o MySQL (com Promises) |
| `cors` | Liberar requisições apenas das origens do frontend |
| `dotenv` | Variáveis de ambiente |
| `nodemon` *(dev)* | Reiniciar o servidor automaticamente |

---

## 6. Banco de Dados

Banco: **`dashboardgamer`** — tabela **`jogos`**. Localmente roda em MySQL 8; em produção, no TiDB Cloud (compatível com MySQL), com conexão TLS (`DB_SSL=true`).

```sql
CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    horas_jogadas DECIMAL(6,1) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `INT` | Identificador (auto incremento) |
| `nome` | `VARCHAR(120)` | Nome do jogo |
| `horas_jogadas` | `DECIMAL(6,1)` | Horas jogadas (1 casa decimal) |
| `plataforma` | `VARCHAR(50)` | Plataforma (salva como texto, ex.: `PS4`) |
| `criado_em` | `TIMESTAMP` | Data de criação |
| `atualizado_em` | `TIMESTAMP` | Atualizada automaticamente a cada alteração |

---

## 7. API REST

URL base:

| Ambiente | URL |
|---|---|
| Local | `http://localhost:3000/api/jogos` |
| Produção | `https://dashboard-gamer.onrender.com/api/jogos` |

| Método | Rota | Descrição | Sucesso | Erros |
|:---:|:---|:---|:---:|:---:|
| `GET` | `/` | Lista os jogos (aceita `plataforma` e `ordem`) | 200 | 500 |
| `GET` | `/:id` | Busca um jogo pelo ID | 200 | 404, 500 |
| `POST` | `/` | Cadastra um jogo | 201 | 400, 500 |
| `PUT` | `/:id` | Altera um jogo | 200 | 400, 404, 500 |
| `DELETE` | `/:id` | Exclui um jogo | 200 | 404, 500 |

Corpo esperado em `POST` e `PUT`:

```json
{
  "nome": "The Witcher 3",
  "horas_jogadas": 120.5,
  "plataforma": "PC"
}
```

### CORS

A API só aceita requisições de navegador vindas das origens configuradas em `backend/src/server.js`:

- `https://dashboardgamer.netlify.app` (produção);
- `http://localhost:5500` (Live Server, desenvolvimento).

A origem deve coincidir exatamente: `http://127.0.0.1:5500` **não** é o mesmo que `http://localhost:5500`. O CORS é uma proteção do navegador e não substitui autenticação (`curl` e Postman não são bloqueados).

Os detalhes de cada endpoint estão em [`backend/README.md`](./backend/README.md).

---

## 8. Regras de Negócio

| Regra | Comportamento |
|---|---|
| Nome do jogo | Texto obrigatório, até **120** caracteres |
| Horas jogadas | Número finito, **maior ou igual a 0** |
| Plataforma | Texto obrigatório, até **50** caracteres; `selection` é rejeitado |
| Nome duplicado | Bloqueado no frontend (sem diferenciar maiúsculas de minúsculas) |
| Pesquisa | Exige no mínimo **3** caracteres |
| Exclusão | Exige confirmação do usuário |
| Editar / excluir inexistente | A API responde **404** |
| Dados inválidos, corpo ausente ou ID inválido (`PUT`) | A API responde **400** |
| Origem não permitida | O navegador bloqueia a resposta (CORS) |

### Fluxo de edição

1. Clicar em **Editar** no card do jogo;
2. O formulário é preenchido com os dados atuais;
3. Alterar os campos e clicar no botão do formulário;
4. O frontend envia um `PUT` e recarrega a lista a partir da API.

---

## 9. Pré-requisitos

Para executar o projeto, é necessário possuir:

- **Node.js 18 ou superior** (com `npm`);
- **MySQL 8** (ou MariaDB compatível) em execução;
- Navegador moderno;
- Um servidor estático para o frontend na porta **5500** (ex.: extensão **Live Server** do VS Code);
- Git, caso queira clonar o projeto.

Verifique as versões instaladas:

```bash
node --version
npm --version
mysql --version
```

---

## 10. Como Executar

### 10.1. Clonar o repositório

```bash
git clone https://github.com/sam77g/DASHBOARD_GAMER.git
```

### 10.2. Criar o banco de dados

```bash
cd DASHBOARD_GAMER/backend
mysql -u root -p < database/schema.sql
```

### 10.3. Configurar as variáveis de ambiente

Copie o arquivo de exemplo e preencha:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=dashboardgamer
DB_SSL=false
```

`PORT` é opcional (padrão `3000`). Use `DB_SSL=true` ao conectar em um banco remoto que exija TLS, como o TiDB Cloud.

### 10.4. Instalar as dependências e iniciar o backend

```bash
npm install
npm start        # node src/server.js
npm run dev      # reinicia sozinho ao salvar (nodemon)
```

O servidor ficará disponível em `http://localhost:3000`.

### 10.5. Abrir o frontend

Abra a pasta `frontend/` com o **Live Server** do VS Code (porta **5500**) sobre `frontend/index.html` e acesse por `http://localhost:5500`.

> Os módulos JavaScript (`type="module"`) **não funcionam** abrindo o arquivo diretamente (`file://`). Use sempre um servidor HTTP.
>
> Outras portas (ex.: `npx serve`) precisam ser adicionadas a `origensPermitidas` em `backend/src/server.js`, senão o navegador bloqueia as requisições por CORS.

### 10.6. Apontar o frontend para a API

Por padrão, `frontend/js/api/jogosApi.js` usa a **API de produção** (`https://dashboard-gamer.onrender.com/api/jogos`). Para usar o backend local, altere `API_URL` para `http://localhost:3000/api/jogos` (sem versionar a mudança).

### 10.7. Publicação

| Parte | Serviço | Observações |
|---|---|---|
| Frontend | Netlify | Site estático, sem build |
| Backend | Render | Comando `npm start`; variáveis `DB_*` e `DB_SSL=true` no painel; `PORT` definido pelo Render |
| Banco | TiDB Cloud | Execute o `schema.sql` no banco `dashboardgamer` |

Ao publicar o frontend em um novo domínio, adicione-o a `origensPermitidas` e faça um novo deploy do backend.

---

## 11. Fluxo do Sistema

O fluxo geral do Dashboard Gamer pode ser representado da seguinte maneira:

```text
                ┌──────────────────────────────┐
                │  Navegador (frontend)        │
                │  Netlify                     │
                └──────────────┬───────────────┘
                               │  fetch (JSON) + CORS
                               ▼
                ┌──────────────────────────────┐
                │  API Express (Render)        │
                │  /api/jogos                  │
                └──────────────┬───────────────┘
                               │  mysql2 (pool, TLS)
                               ▼
                ┌──────────────────────────────┐
                │  TiDB Cloud (MySQL)          │
                │  dashboardgamer.jogos        │
                └──────────────────────────────┘
```

### Fluxo de uso

```text
Login (username + e-mail)
            │
            ▼
   Salvar usuário no localStorage
            │
            ▼
        Dashboard
            │
            ▼
   GET /api/jogos  ──►  Renderizar cards
            │
            ▼
 Adicionar / Editar / Excluir / Pesquisar
            │
            ▼
 POST / PUT / DELETE  ──►  Recarregar lista
```

### Fluxo de cadastro

```text
Preencher formulário
        │
        ▼
 Dados válidos? ── não ──► Alerta
        │ sim
        ▼
 Nome já existe? ── sim ─► Alerta
        │ não
        ▼
   POST /api/jogos
        │
        ▼
  Validação no backend
        │
        ▼
   INSERT no MySQL
        │
        ▼
 Recarregar lista e limpar formulário
```

---

## 12. Status do Projeto

**Em desenvolvimento — publicado e com o CRUD funcionando em produção.**

### Implementado

- [x] Tela de login com validação básica e redirecionamento para o dashboard;
- [x] Exibição do usuário no dashboard;
- [x] API REST com CRUD de jogos (testado em produção);
- [x] Persistência em banco MySQL compatível (TiDB Cloud);
- [x] Consultas SQL parametrizadas;
- [x] Filtro por plataforma e ordenação por nome na API;
- [x] Validação de dados no backend (corpo, ID e campos);
- [x] Validação de dados e bloqueio de duplicidade no frontend;
- [x] Cadastro, edição e exclusão pela interface;
- [x] Pesquisa em tempo real;
- [x] Cards gerados dinamicamente;
- [x] Frontend modularizado com ES Modules;
- [x] **CORS restrito** às origens do frontend;
- [x] Scripts `start` e `dev` e porta configurável (`PORT`);
- [x] Conexão TLS com o banco remoto (`DB_SSL`);
- [x] Deploy: Netlify (frontend), Render (backend) e TiDB Cloud (banco).

### Pendências conhecidas

O planejamento completo está em [`docs/ROADMAP.md`](./docs/ROADMAP.md). As principais pendências imediatas (Etapa 1):

- [ ] Mostrar erros de cadastro/edição na interface (hoje só no console);
- [ ] Alinhar as validações do frontend e do backend (tamanho do nome, limite de horas);
- [ ] Camada `services` (`jogosService.js` está vazio) e middleware central de erros;
- [ ] Configuração por ambiente: `API_URL` fixa no frontend e origens do CORS fixas no backend;
- [ ] Testes automatizados;
- [ ] `render.js` com funções vazias (XP, level, conquistas, total de horas e quantidade de jogos) — Etapa 2;
- [ ] `.env.example` com `DB_NAME` vazio e sem `PORT`; `package.json` com `main` e `license` inconsistentes;
- [ ] Pequenos ajustes no login (`action` do formulário, `name="sername"`, link do LinkedIn);
- [ ] Preencher o `CONTRIBUTING.md` (hoje vazio).

### Fora do escopo da versão atual

- [ ] Autenticação real (senha, sessão ou JWT) — Etapa 4;
- [ ] Jogos separados por usuário — Etapa 4;
- [ ] Capas personalizadas por jogo;
- [ ] Gráficos e recursos sociais.

---

## 13. Contribuição

Para informações sobre colaboração e organização do repositório, consulte o [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## 14. Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [`LICENSE`](./LICENSE) para obter o texto completo da licença.

---

<div align="center">

**Dashboard Gamer**

Desenvolvido por **Samuel** — [GitHub](https://github.com/sam77g) · [LinkedIn](https://linkedin.com/in/samuel-santana-assis)

</div>
