var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

// CRUD da empresa 

router.get("/listarEmpresa/:idEmpresa", function (req, res) {
  empresaController.listarEmpresa(req, res);
});

// router.put("/deletarEmpresa/:idEmpresa", function (req, res) {
//   empresaController.deletarEmpresa(req, res);
// });

router.put("/atualizarEmpresa/:idEmpresa", function (req, res) {
  empresaController.atualizarEmpresa(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    empresaController.cadastrarMaquina(req, res);
  });

module.exports = router;