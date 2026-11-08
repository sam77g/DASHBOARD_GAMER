// SERVIDOR 

const express = require("express"); // importa o express 
const app = express();

const jogosRoutes = require("./routes/jogosRoutes"); // rotas

// Middleware para interpretar JSON
app.use(express.json());

// Registrar as rotas de jogos
// /api/jogos + /
app.use("/api/jogos", jogosRoutes);

// Iniciar servidor na porta 300
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});