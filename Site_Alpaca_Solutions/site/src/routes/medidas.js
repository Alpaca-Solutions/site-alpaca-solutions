var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})


router.get("/buscarRede", function (req, res) {
    medidaController.buscarRede(req, res);
})

router.get("/buscarMemoria", function (req, res) {
    medidaController.buscarMemoria(req, res);
})
router.get("/buscarDisco", function (req, res) {
    medidaController.buscarDisco(req, res);
})

router.get("/buscarCPU", function (req, res) {
    medidaController.buscarCPU(req, res);
})

router.get("/buscarRedeId/:idMaquina", function (req, res) {
    medidaController.buscarRedeId(req, res);
})

router.get("/buscarMemoriaId/:idMaquina", function (req, res) {
    medidaController.buscarMemoriaId(req, res);
})
router.get("/buscarDiscoId/:idMaquina", function (req, res) {
    medidaController.buscarDiscoId(req, res);
})

router.get("/buscarCPUId/:idMaquina", function (req, res) {
    medidaController.buscarCPUId(req, res);
})

router.get("/buscarQtdMaquinaAlerta", function (req, res) {
    medidaController.buscarQtdMaquinaAlerta(req, res);
})

router.get("/buscarQtdProcessadorAlerta", function (req, res) {
    medidaController.buscarQtdProcessadorAlerta(req, res);
})
router.get("/MaquinasAlerta", function (req, res) {
    medidaController.MaquinasAlerta(req, res);
})

router.get("/buscarMaquinasUsuario/:idNovo", function (req, res) {
    medidaController.buscarMaquinasUsuario(req, res);
})





module.exports = router;