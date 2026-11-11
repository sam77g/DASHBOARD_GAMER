<div align="center">

# Dashboard Gamer — Backend

**API REST em Node.js, Express e MySQL responsável por armazenar e gerenciar os jogos do Dashboard Gamer.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-mysql2-4479A1?logo=mysql&logoColor=white)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

</div>

---

## Sumário

1. [Sobre o Backend](#1-sobre-o-backend)
2. [Objetivos](#2-objetivos)
3. [Funcionalidades](#3-funcionalidades)
4. [Arquitetura](#4-arquitetura)
5. [Tecnologias e Dependências](#5-tecnologias-e-dependências)
6. [Banco de Dados](#6-banco-de-dados)
7. [Endpoints](#7-endpoints)
8. [Validações e Regras de Negócio](#8-validações-e-regras-de-negócio)
9. [Pré-requisitos](#9-pré-requisitos)
10. [Como Executar](#10-como-executar)
11. [Fluxo de uma Requisição](#11-fluxo-de-uma-requisição)
12. [Status do Backend](#12-status-do-backend)
13. [Licença](#13-licença)

---

## 1. Sobre o Backend

O backend do **Dashboard Gamer** é uma API REST que expõe operações de **CRUD** sobre a tabela de jogos, armazenada em **MySQL**.

Ele é consumido pelo [frontend](../frontend/README.md) através de requisições `fetch` com JSON e roda por padrão em:

```text
http://localhost:3000
```

Todas as rotas ficam sob o prefixo:

```text
/api/jogos
```

---

## 2. Objetivos

- Construir uma API REST com Express;
- Conectar uma aplicação Node.js a um banco MySQL usando `mysql2/promise`;
- Utilizar **pool de conexões**;
- Executar consultas **parametrizadas** (prevenção de SQL Injection);
- Organizar o código em camadas (rotas, controllers, configuração);
- Validar os dados recebidos antes de gravar no banco;
- Retornar códigos HTTP e mensagens de erro coerentes;
- Proteger credenciais com variáveis de ambiente.

---

## 3. Funcionalidades

A API permite:

- Listar jogos;
- Filtrar jogos por plataforma;
- Ordenar jogos pelo nome (crescente ou decrescente);
- Buscar um jogo pelo ID;
- Cadastrar um jogo;
- Alterar um jogo;
- Excluir um jogo;
- Registrar automaticamente data de criação e de atualização.

---

## 4. Arquitetura

```text
backend/
│
├── database/
│   └── schema.sql
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── jogosController.js
│   ├── routes/
│   │   └── jogosRoutes.js
│   ├── services/
│   │   └── jogosService.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Responsabilidade dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `server.js` | Cria o app Express, registra middlewares (`express.json`, `cors`), monta as rotas e inicia o servidor |
| `routes/jogosRoutes.js` | Mapeia método + caminho para a função do controller |
| `controllers/jogosController.js` | Validação, consultas SQL e respostas HTTP |
| `config/database.js` | Cria e exporta o pool de conexões MySQL |
| `services/jogosService.js` | Reservado para regras de negócio (ainda vazio) |
| `database/schema.sql` | Criação do banco `dashboardgamer` e da tabela `jogos` |
| `.env.example` | Modelo das variáveis de ambiente |

### Fluxo entre camadas

```text
Requisição HTTP
      │
      ▼
   server.js   (JSON + CORS)
      │
      ▼
 jogosRoutes   (método + caminho)
      │
      ▼
jogosController (validação + SQL)
      │
      ▼
  database.js  (pool mysql2)
      │
      ▼
    MySQL
```

---

## 5. Tecnologias e Dependências

### Plataforma

- **Node.js 18+** (CommonJS)

### Dependências

| Biblioteca | Versão | Finalidade |
|---|---|---|
| `express` | ^5.3.0 | Servidor HTTP e roteamento |
| `mysql2` | ^3.24.6 | Driver MySQL com suporte a Promises |
| `cors` | ^2.8.6 | Permitir requisições de outras origens (frontend) |
| `dotenv` | ^18.0.9 | Carregar variáveis do arquivo `.env` |

### Dependências de desenvolvimento

| Biblioteca | Versão | Finalidade |
|---|---|---|
| `nodemon` | ^3.1.14 | Reiniciar o servidor ao salvar arquivos |

---

## 6. Banco de Dados

Banco: **`dashboardgamer`** — tabela **`jogos`**.

```sql
CREATE DATABASE IF NOT EXISTS dashboardgamer;

USE dashboardgamer;

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

| Coluna | Tipo | Restrição | Descrição |
|---|---|---|---|
| `id` | `INT` | PK, auto incremento | Identificador do jogo |
| `nome` | `VARCHAR(120)` | NOT NULL | Nome do jogo |
| `horas_jogadas` | `DECIMAL(6,1)` | NOT NULL | Horas jogadas (até `99999.9`) |
| `plataforma` | `VARCHAR(50)` | NOT NULL | Plataforma (texto exibido, ex.: `PS4`, `N. SWITCH`) |
| `criado_em` | `TIMESTAMP` | padrão `CURRENT_TIMESTAMP` | Data de criação |
| `atualizado_em` | `TIMESTAMP` | atualiza a cada `UPDATE` | Data da última alteração |

### Conexão

O pool é criado em `src/config/database.js` com as variáveis de ambiente:

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

---

## 7. Endpoints

URL base: `http://localhost:3000/api/jogos`

| Método | Rota | Função do controller | Descrição |
|:---:|:---|:---|:---|
| `GET` | `/` | `listarJogos` | Lista os jogos |
| `GET` | `/:id` | `buscarJogoPorId` | Busca um jogo pelo ID |
| `POST` | `/` | `cadastrarJogo` | Cadastra um jogo |
| `PUT` | `/:id` | `editarJogo` | Altera um jogo |
| `DELETE` | `/:id` | `excluirJogo` | Exclui um jogo |

---

### 7.1. `GET /api/jogos`

Lista os jogos. Parâmetros de consulta opcionais:

| Parâmetro | Valores | Descrição |
|---|---|---|
| `plataforma` | texto (ex.: `PC`) | Filtra pela plataforma (igualdade exata) |
| `ordem` | `asc` \| `desc` | Ordena pelo nome |

Exemplos:

```http
GET /api/jogos
GET /api/jogos?plataforma=PC
GET /api/jogos?ordem=desc
GET /api/jogos?plataforma=PS4&ordem=asc
```

Resposta `200`:

```json
[
  {
    "id": 1,
    "nome": "The Witcher 3",
    "horas_jogadas": "120.5",
    "plataforma": "PC",
    "criado_em": "2026-01-10T14:30:00.000Z",
    "atualizado_em": "2026-01-10T14:30:00.000Z"
  }
]
```

> O `mysql2` retorna colunas `DECIMAL` como **string** (`"120.5"`).

Erro `500`:

```json
{ "mensagem": "Erro interno ao buscar jogos." }
```

---

### 7.2. `GET /api/jogos/:id`

```http
GET /api/jogos/1
```

Resposta `200`: objeto do jogo (mesmo formato acima).

Resposta `404`:

```json
{ "mensagem": "Jogo não encontrado" }
```

---

### 7.3. `POST /api/jogos`

Corpo da requisição (`Content-Type: application/json`):

```json
{
  "nome": "Hollow Knight",
  "horas_jogadas": 35.5,
  "plataforma": "N. SWITCH"
}
```

Resposta `201`:

```json
{
  "mensagem": "Jogo cadastrado com sucesso",
  "id": 7
}
```

Resposta `400`:

```json
{ "mensagem": "Dados inválidos" }
```

> **Atenção:** na versão atual, a checagem inicial do corpo em `cadastrarJogo` está com defeito (veja [Status do Backend](#12-status-do-backend)) e o endpoint responde `500`.

---

### 7.4. `PUT /api/jogos/:id`

Mesmo corpo do `POST`. Substitui `nome`, `horas_jogadas` e `plataforma`.

Resposta `200`:

```json
{
  "mensagem": "Jogo alterado com sucesso !",
  "id": "7",
  "jogo": "Hollow Knight"
}
```

Respostas de erro:

| Status | Mensagem |
|:---:|:---|
| `400` | `Dados inválidos` |
| `404` | `Jogo não encontrado` |
| `500` | `Erro interno ao alterar o jogo.` |

---

### 7.5. `DELETE /api/jogos/:id`

Resposta `200`:

```json
{
  "mensagem": "Jogo deletado com sucesso !",
  "id": "7"
}
```

Respostas de erro:

| Status | Mensagem |
|:---:|:---|
| `404` | `Jogo não encontrado` |
| `500` | `Erro interno ao deletar o jogo.` |

---

### 7.6. Códigos de status utilizados

| Código | Significado |
|:---:|:---|
| `200` | Operação realizada com sucesso |
| `201` | Recurso criado |
| `400` | Dados inválidos |
| `404` | Jogo não encontrado |
| `500` | Erro interno do servidor |

---

## 8. Validações e Regras de Negócio

A função `validarValoresRecebidos` é aplicada em `POST` e `PUT`.

| Campo | Regra |
|---|---|
| `nome` | Deve ser `string`, não vazio (após `trim`) e ter no máximo **120** caracteres |
| `horas_jogadas` | Deve ser `number` finito e **maior ou igual a 0** |
| `plataforma` | Deve ser `string`, não vazia (após `trim`), com no máximo **50** caracteres, e diferente de `selection` |

| Regra | Comportamento |
|---|---|
| Espaços nas pontas | `nome` e `plataforma` são salvos com `trim()` |
| Horas como texto | Rejeitadas (`"10"` não é `number`) |
| Editar/excluir ID inexistente | Responde `404` antes de alterar o banco |
| SQL | Todas as consultas usam parâmetros `?` (prepared statements) |
| Ordenação | `ordem` só aceita `asc` ou `desc`; qualquer outro valor é ignorado |
| CORS | Habilitado para todas as origens |

---

## 9. Pré-requisitos

Para executar o backend, é necessário possuir:

- **Node.js 18 ou superior**;
- **MySQL 8** (ou MariaDB compatível) em execução;
- Um usuário do MySQL com permissão para criar banco e tabelas.

Verifique as versões instaladas:

```bash
node --version
npm --version
mysql --version
```

---

## 10. Como Executar

### 10.1. Acessar a pasta do backend

```bash
cd DASHBOARD_GAMER/backend
```

### 10.2. Criar o banco e a tabela

```bash
mysql -u root -p < database/schema.sql
```

### 10.3. Configurar o `.env`

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

> O arquivo `.env` está no `.gitignore` e **não deve ser versionado**.

### 10.4. Instalar as dependências

```bash
npm install
```

### 10.5. Iniciar o servidor

```bash
npm start        # produção: node src/server.js
npm run dev      # desenvolvimento: reinicia sozinho ao salvar (nodemon)
```

Saída esperada:

```text
Servidor rodando em http://localhost:3000
```

### 10.6. Testar

```bash
curl http://localhost:3000/api/jogos
```

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/api/jogos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Hollow Knight","horas_jogadas":35.5,"plataforma":"N. SWITCH"}'
```

---

## 11. Fluxo de uma Requisição

### Cadastro de jogo

```text
POST /api/jogos
        │
        ▼
 express.json() interpreta o corpo
        │
        ▼
 jogosController.cadastrarJogo
        │
        ▼
 validarValoresRecebidos
    /            \
 inválido       válido
    │              │
    ▼              ▼
  400        INSERT INTO jogos
                   │
                   ▼
             201 + id do jogo
```

### Alteração / exclusão

```text
PUT / DELETE /api/jogos/:id
            │
            ▼
   (PUT) validar dados ── inválidos ──► 400
            │
            ▼
   SELECT * WHERE id = ?
        /          \
  não existe      existe
      │              │
      ▼              ▼
     404       UPDATE / DELETE
                     │
                     ▼
                    200
```

---

## 12. Status do Backend

**Em desenvolvimento.**

### Implementado

- [x] Servidor Express com JSON e CORS;
- [x] Pool de conexões MySQL com variáveis de ambiente;
- [x] Listagem com filtro por plataforma e ordenação por nome;
- [x] Busca por ID;
- [x] Alteração e exclusão com verificação de existência (404);
- [x] Validação dos dados recebidos;
- [x] Consultas parametrizadas;
- [x] Tratamento de erros com `try/catch` e respostas `500`;
- [x] Script SQL de criação do banco.

### Pendências conhecidas

- [ ] **Corrigir `cadastrarJogo`:** a verificação do corpo usa `value` (variável inexistente) e a condição `!Array.isArray(...)` está invertida. Hoje isso gera `ReferenceError` e o `POST` responde `500`. Sugestão: `if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body))`;
- [ ] Validar `req.body` também no `PUT` (sem corpo JSON, a desestruturação falha e responde `500`);
- [ ] Validar o limite de `horas_jogadas` (`DECIMAL(6,1)` aceita até `99999.9`);
- [ ] Mover regras e consultas para `services/jogosService.js` (arquivo vazio);
- [ ] Criar os scripts `start` e `dev` no `package.json`;
- [ ] Tornar a porta configurável via `.env` (hoje fixa em `3000`);
- [ ] Preencher `DB_NAME=dashboardgamer` no `.env.example`;
- [ ] Restringir o CORS à origem do frontend em produção.

### Fora do escopo da versão atual

- [ ] Autenticação e autorização;
- [ ] Jogos por usuário;
- [ ] Paginação;
- [ ] Testes automatizados;
- [ ] Deploy.

---

## 13. Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [`LICENSE`](../LICENSE) para obter o texto completo da licença.

---

<div align="center">

**Dashboard Gamer — Backend**

Desenvolvido por **Samuel**.

</div>