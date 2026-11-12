// SERVIDOR - server.js
require("dotenv").config(); // carrega as variáveis de ambiente
const cors = require("cors");
const express = require("express"); // importa o express 
const app = express();

const jogosRoutes = require("./routes/jogosRoutes"); // rotas

// Middleware para interpretar JSON
app.use(express.json());
// Middleware do CORS
app.use(cors());

// Registrar as rotas de jogos
// /api/jogos + /
app.use("/api/jogos", jogosRoutes);

// Iniciar servidor na porta 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Resultado:
// GET http://localhost:3000/api/jogos