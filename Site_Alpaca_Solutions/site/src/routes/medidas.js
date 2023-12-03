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





module.exports = router;