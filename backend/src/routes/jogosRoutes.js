// ROTA PRIMÁRIA

// Importando
const express = require("express"); // importando o express
const router = express.Router(); // criando um router
const jogosController = require("../controllers/jogosController"); // importando o controller

// REGISTRANDO A ROTA
// método GET (.get), caminho "/" , função executada listarJogos()
router.get("/", jogosController.listarJogos);

// Exportando
module.exports = router;