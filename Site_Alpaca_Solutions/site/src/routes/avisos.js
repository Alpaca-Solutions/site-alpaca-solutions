var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar_usuarios/:idEmpresa", function (req, res) {
    avisoController.listar_usuarios(req, res);
});

router.get("/listarUsuario/:idUsuario", function (req, res) {
    avisoController.listarUsuario(req, res);
});

router.put("/deletarUsuario/:idUsuario", function (req, res) {
    avisoController.deletarUsuario(req, res);
});

router.put("/atualizarUsuario/:idUsuario", function (req, res) {
    avisoController.atualizarUsuario(req, res);
});

router.get("/listar_maquinas/:idEmpresa", function (req, res) {
    avisoController.listar_Maquinas(req, res);
});

router.put("/deletarMaquina/:idMaquina", function (req, res) {
    avisoController.deletarMaquina(req, res);
});

router.put("/atualizarMaquina/:idMaquina", function (req, res) {
    avisoController.atualizarMaquina(req, res);
});

router.get("/listarMaquina/:idMaquina", function (req, res) {
    avisoController.listarMaquina(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;