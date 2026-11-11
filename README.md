<div align="center">

# DASHBOARD GAMER

**Dashboard fullstack para registrar e organizar sua biblioteca de jogos, com horas jogadas e plataforma, desenvolvido com HTML, CSS, JavaScript, Node.js, Express e MySQL.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)
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

A comunicação entre as partes é feita via `fetch`, trocando JSON com a API em `http://localhost:3000/api/jogos`.

> **Observação:** diferente das versões anteriores do projeto (que salvavam os jogos no `localStorage`), os jogos agora são **persistidos no banco de dados MySQL**. O `localStorage` é usado apenas para guardar o usuário "logado" (nome e e-mail).

Documentação detalhada de cada parte:

- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)

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
- Praticar layout responsivo com Flexbox.

---

## 3. Funcionalidades

### 3.1. Login

- Tela de login com **username** e **e-mail**;
- Validação básica dos campos antes de entrar;
- Dados do usuário salvos no `localStorage`;
- O nome do usuário é exibido no painel de perfil do dashboard.

> O login é **apenas visual** (identificação local). Não há senha, sessão ou autenticação no servidor.

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

- **PlayStation:** PS1, PS2, PS3, PS4, PSP, PS VITA
- **Xbox:** XBOX, XBOX 360, XBOX ONE, XBOX SERIES
- **Nintendo:** N. SWITCH, N. SWITCH 2
- **PC**

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

O painel de perfil exibe o nome do usuário logado. Os campos de **XP**, **level** e **conquistas** estão reservados na interface para evoluções futuras.

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
│   │   │   ├── script.js
│   │   │   └── storage.js
│   │   └── utils/
│   │       └── validar.js
│   ├── auth.js
│   ├── index.html
│   └── README.md
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
| `backend/src/config` | Conexão (pool) com o MySQL |
| `backend/database` | Script de criação do banco e da tabela |

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

### Backend

| Biblioteca | Finalidade |
|---|---|
| `express` | Servidor HTTP e rotas |
| `mysql2` | Conexão com o MySQL (com Promises) |
| `cors` | Liberar requisições do frontend |
| `dotenv` | Variáveis de ambiente |
| `nodemon` *(dev)* | Reiniciar o servidor automaticamente |

---

## 6. Banco de Dados

Banco: **`dashboardgamer`** — tabela **`jogos`**.

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

URL base: `http://localhost:3000/api/jogos`

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
| Dados inválidos | A API responde **400** |

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
- Um servidor estático para o frontend (ex.: extensão **Live Server** do VS Code);
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
```

### 10.4. Instalar as dependências e iniciar o backend

```bash
npm install
node src/server.js
```

Ou, com reinício automático:

```bash
npx nodemon src/server.js
```

O servidor ficará disponível em `http://localhost:3000`.

### 10.5. Abrir o frontend

Em outro terminal ou no VS Code, abra a pasta `frontend/` com um servidor estático (por exemplo, **Live Server** sobre `frontend/index.html`).

```bash
cd frontend
npx serve .
```

> Os módulos JavaScript (`type="module"`) **não funcionam** abrindo o arquivo diretamente (`file://`). Use sempre um servidor HTTP.

---

## 11. Fluxo do Sistema

O fluxo geral do Dashboard Gamer pode ser representado da seguinte maneira:

```text
                ┌──────────────────────┐
                │    Navegador         │
                │    (frontend)        │
                └──────────┬───────────┘
                           │  fetch (JSON)
                           ▼
                ┌──────────────────────┐
                │  API Express :3000   │
                │  /api/jogos          │
                └──────────┬───────────┘
                           │  mysql2 (pool)
                           ▼
                ┌──────────────────────┐
                │  MySQL               │
                │  dashboardgamer.jogos│
                └──────────────────────┘
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

**Em desenvolvimento.**

### Implementado

- [x] Tela de login com validação básica;
- [x] Exibição do usuário no dashboard;
- [x] API REST com CRUD de jogos;
- [x] Persistência em MySQL;
- [x] Consultas SQL parametrizadas;
- [x] Filtro por plataforma e ordenação por nome na API;
- [x] Validação de dados no backend;
- [x] Validação de dados e bloqueio de duplicidade no frontend;
- [x] Cadastro, edição e exclusão pela interface;
- [x] Pesquisa em tempo real;
- [x] Cards gerados dinamicamente;
- [x] Frontend modularizado com ES Modules;
- [x] CORS habilitado.

### Em andamento / pendências conhecidas

- [ ] **Cadastro (`POST`):** a validação do corpo da requisição em `jogosController.js` referencia uma variável inexistente (`value`) e a condição está invertida, o que faz o endpoint responder **500**. Precisa ser corrigida para o cadastro funcionar;
- [ ] **Login → dashboard:** o formulário e o `auth.js` redirecionam para `./dashboard/index.html`, mas o arquivo se chama `dashboard/dashboard.html`;
- [ ] Camada `services` (`jogosService.js` está vazio);
- [ ] Renderização de XP, level, conquistas, total de horas e quantidade de jogos (`render.js` com funções vazias);
- [ ] Remoção do `storage.js` (não é mais utilizado, pois os dados vêm da API);
- [ ] Scripts `start` e `dev` no `package.json`;
- [ ] Porta e URL da API configuráveis (hoje fixas em `3000` e `localhost`);
- [ ] Preencher o `CONTRIBUTING.md`.

### Fora do escopo da versão atual

- [ ] Autenticação real (senha, sessão ou JWT);
- [ ] Jogos separados por usuário;
- [ ] Capas personalizadas por jogo;
- [ ] Testes automatizados;
- [ ] Deploy.

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