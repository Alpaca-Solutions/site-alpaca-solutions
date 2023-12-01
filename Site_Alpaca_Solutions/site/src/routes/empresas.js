var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

// CRUD da empresa


// Rota para recuperar uma empresa pelo ID
router.get('/:id', empresaController.recuperarEmpresaCompleta);

// Rota para atualizar uma empresa pelo ID
router.put('/:id', empresaController.atualizarEmpresaCompleta);

// Rota para excluir uma empresa pelo ID
router.delete('/:id', empresaController.excluirEmpresaCompleta);

router.post("/cadastrarMaquina", function (req, res) {
    empresaController.cadastrarMaquina(req, res);
  });

module.exports = router;