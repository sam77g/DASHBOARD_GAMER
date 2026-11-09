// ROTAS

// Importando
const express = require("express"); // importando o express
const router = express.Router(); // criando um router
const jogosController = require("../controllers/jogosController"); // importando o controller

// REGISTRANDO A ROTA
// método GET (.get), caminho "/" , função executada listarJogos()
router.get("/", jogosController.listarJogos);

// método POST (.post), caminho /, função executada cadastrarJogo()
router.post("/", jogosController.cadastrarJogo);

router.get("/:id", jogosController.buscarJogoPorId);

router.put("/:id", jogosController.editarJogo);

router.delete("/:id", jogosController.excluirJogo);

// Exportando
module.exports = router;