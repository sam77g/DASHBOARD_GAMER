# Guia de Contribuição — Dashboard Gamer

Obrigado pelo interesse em contribuir com o **Dashboard Gamer**!

Este documento apresenta as orientações para colaborar com o projeto, desde a preparação do ambiente de desenvolvimento até o envio de alterações.

## 1. Sobre o projeto

O Dashboard Gamer é uma aplicação web para cadastrar, consultar, editar e excluir jogos, registrando informações como nome, horas jogadas e plataforma.

O projeto utiliza:

- **Frontend:** HTML5, CSS3 e JavaScript puro com ES Modules.
- **Backend:** Node.js e Express.
- **Banco de dados:** MySQL, com compatibilidade com TiDB Cloud.
- **Comunicação:** API REST utilizando JSON.

## 2. Como contribuir

Existem diferentes maneiras de contribuir com o projeto:

- Corrigir bugs e problemas existentes.
- Melhorar funcionalidades já implementadas.
- Desenvolver novas funcionalidades.
- Melhorar a interface e a experiência do usuário.
- Aprimorar a organização e a legibilidade do código.
- Melhorar a documentação.
- Sugerir melhorias e relatar problemas.

Antes de implementar uma mudança significativa, procure verificar se já existe alguma discussão ou implementação relacionada.

## 3. Preparando o ambiente

### Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) (com npm).
- [MySQL](https://dev.mysql.com/downloads/).
- [Git](https://git-scm.com/).
- Um editor de código, como [Visual Studio Code](https://code.visualstudio.com/).

### 3.1. Faça um fork do repositório

Faça um fork do projeto para sua conta do GitHub e clone sua cópia:

```bash
git clone https://github.com/SEU-USUARIO/DASHBOARD_GAMER-main.git
```

Entre na pasta do projeto:

```bash
cd DASHBOARD_GAMER-main
```

Adicione o repositório original como referência:

```bash
git remote add upstream https://github.com/sam77g/DASHBOARD_GAMER.git
```

> Substitua os endereços pelos URLs correspondentes ao repositório original e ao seu fork, caso sejam diferentes.

### 3.2. Configure o banco de dados

Crie o banco e a tabela utilizando o arquivo SQL disponibilizado no projeto:

```bash
mysql -u root -p < backend/database/schema.sql
```

O comando utiliza o usuário `root`. Caso seu MySQL utilize outro usuário, substitua-o.

### 3.3. Configure o backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Configure as credenciais do seu banco de dados:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=dashboardgamer
```

Não compartilhe suas credenciais e não envie o arquivo `.env` para o GitHub.

Inicie o servidor:

```bash
node src/server.js
```

O backend deverá ficar disponível em:

```text
http://localhost:3000
```

A API de jogos poderá ser acessada em:

```text
http://localhost:3000/api/jogos
```

### 3.4. Execute o frontend

Abra a pasta `frontend` utilizando um servidor HTTP local, como a extensão **Live Server** do Visual Studio Code.

Evite abrir o arquivo HTML diretamente pelo navegador utilizando `file://`, pois o projeto utiliza módulos JavaScript ES Modules.

Com o backend e o frontend em execução, acesse a página inicial da aplicação pelo endereço disponibilizado pelo servidor local.

## 4. Organização do código

Respeite a estrutura existente do projeto e procure manter cada responsabilidade em seu respectivo arquivo.

### Frontend

Os arquivos estão organizados em:

- `frontend/`: páginas HTML e autenticação.
- `frontend/assets/`: imagens e arquivos CSS.
- `frontend/js/api/`: comunicação com a API.
- `frontend/js/modules/`: funcionalidades e módulos da aplicação.
- `frontend/js/utils/`: funções auxiliares e validações.

### Backend

Os arquivos estão organizados em:

- `backend/src/config/`: configurações e conexão com o banco.
- `backend/src/controllers/`: tratamento das requisições HTTP.
- `backend/src/routes/`: definição das rotas da API.
- `backend/src/services/`: camada destinada às regras de negócio.

## 5. Padrões de desenvolvimento

Para manter a consistência do projeto, siga estas convenções:

### 5.1. Nomenclatura

- Utilize nomes de variáveis e funções em português.
- Utilize `camelCase` para variáveis e funções.
- Utilize `snake_case` para colunas do banco de dados.
- Utilize nomes descritivos para arquivos, funções e variáveis.

Exemplo:

```javascript
const horasJogadas = 50;

function calcularHorasTotais() {
    // Implementação
}
```

### 5.2. Organização

- Mantenha cada módulo responsável por uma funcionalidade específica.
- Evite duplicar código.
- Prefira funções pequenas e com responsabilidades bem definidas.
- Utilize os módulos ES Modules no frontend.
- Utilize CommonJS no backend.
- Preserve a separação entre rotas, controllers, services e configurações.

### 5.3. Validação e segurança

- Valide os dados recebidos antes de processá-los.
- Utilize consultas SQL parametrizadas.
- Não exponha senhas, tokens ou credenciais.
- Não armazene informações sensíveis diretamente no código.
- Preserve o tratamento adequado dos erros.

## 6. Trabalhando com a API

A API utiliza o caminho `/api/jogos` para gerenciar os registros.

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/api/jogos` | Listar jogos |
| GET | `/api/jogos/:id` | Consultar um jogo |
| POST | `/api/jogos` | Cadastrar um jogo |
| PUT | `/api/jogos/:id` | Atualizar um jogo |
| DELETE | `/api/jogos/:id` | Excluir um jogo |

Ao modificar a API:

- Preserve os métodos HTTP e suas respectivas responsabilidades.
- Mantenha o padrão de respostas em JSON.
- Utilize códigos HTTP adequados.
- Verifique se as alterações não comprometem as funcionalidades existentes.
- Atualize a documentação caso algum endpoint seja modificado.

## 7. Fluxo de contribuição

Para manter o histórico de alterações organizado, siga este fluxo:

### 7.1. Atualize sua cópia do projeto

Antes de começar uma nova tarefa:

```bash
git checkout main
git pull upstream main
```

### 7.2. Crie uma branch

Utilize nomes que indiquem o objetivo da alteração:

```bash
git checkout -b feature/nova-funcionalidade
```

Sugestões de prefixos:

- `feature/`: novas funcionalidades.
- `fix/`: correções de bugs.
- `docs/`: alterações na documentação.
- `refactor/`: reorganização do código sem alterar seu comportamento.
- `style/`: alterações visuais e de formatação.

### 7.3. Faça suas alterações

Implemente a funcionalidade ou correção seguindo os padrões definidos neste documento.

Procure manter as alterações focadas em uma única tarefa.

### 7.4. Teste antes de enviar

Antes de realizar o commit:

- Verifique se o backend inicia corretamente.
- Verifique se o frontend continua funcionando.
- Teste as funcionalidades afetadas.
- Verifique se as operações de cadastro, consulta, edição e exclusão continuam funcionando quando relacionadas à alteração.
- Confira se não existem erros inesperados no console do navegador ou no terminal.

O projeto ainda não possui uma suíte de testes automatizados configurada. Por isso, os testes devem ser realizados manualmente até que essa estrutura seja implementada.

### 7.5. Faça o commit

Utilize mensagens objetivas e descritivas:

```bash
git add .
git commit -m "feat: adiciona filtro por plataforma"
```

Exemplos:

```text
feat: adiciona sistema de favoritos
fix: corrige atualização de jogos
docs: atualiza instruções de instalação
refactor: organiza validações do backend
style: melhora responsividade do dashboard
```

### 7.6. Envie sua branch

```bash
git push origin feature/nova-funcionalidade
```

### 7.7. Abra um Pull Request

No GitHub, abra um Pull Request direcionado à branch principal do repositório original.

Na descrição, informe:

- O que foi implementado ou corrigido.
- Qual problema a alteração resolve.
- Quais arquivos ou funcionalidades foram modificados.
- Quais testes foram realizados.
- Se existe alguma limitação ou observação importante.

Aguarde a revisão antes de considerar a contribuição integrada ao projeto.

## 8. Relatando bugs e sugerindo melhorias

Ao identificar um problema, procure fornecer informações suficientes para reproduzi-lo.

Inclua, sempre que possível:

- Descrição do problema.
- Passos necessários para reproduzir o erro.
- Resultado esperado.
- Resultado obtido.
- Mensagens de erro do console ou terminal.
- Capturas de tela, quando forem relevantes.

Para sugestões, explique o objetivo da melhoria e como ela poderia beneficiar a aplicação.

## 9. Boas práticas

Ao contribuir, lembre-se de:

- Não enviar arquivos `.env` ou credenciais.
- Não enviar a pasta `node_modules`.
- Não modificar funcionalidades sem verificar seus impactos.
- Não remover códigos ou módulos sem justificativa.
- Não incluir dependências desnecessárias.
- Manter a documentação atualizada.
- Respeitar a organização e as convenções existentes.
- Comunicar alterações que possam afetar o banco de dados ou a API.

## 10. Licença

As contribuições realizadas ao Dashboard Gamer devem respeitar os termos estabelecidos no arquivo [LICENSE](LICENSE) do repositório.

Antes de contribuir, consulte a licença para conhecer as condições de utilização, modificação e distribuição do projeto.

---

**Obrigado por contribuir com o Dashboard Gamer!**

Toda contribuição que ajude a melhorar a qualidade, a organização e a experiência de utilização do projeto é bem-vinda.