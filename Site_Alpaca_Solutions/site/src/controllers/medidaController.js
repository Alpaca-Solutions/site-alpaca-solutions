var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRede(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarRede().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMemoria(req, res) {
    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMemoria().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDisco(req, res) {
    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarDisco().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCPU(req, res) {



    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarCPU().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
// grafico especifico 

function buscarRedeId(req, res) {
    const id = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real para a máquina ${id}`);

    medidaModel.buscarRedeId(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMemoriaId(req, res) {
    const id = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real para a máquina ${id}`);

    medidaModel.buscarMemoriaId(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDiscoId(req, res) {
    const id = req.params.id;

    console.log(`Recuperando medidas em tempo real para a máquina ${id}`);

    medidaModel.buscarDiscoId(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCPUId(req, res) {
    const id = req.params.id;

    console.log(`Recuperando medidas em tempo real para a máquina ${id}`);

    medidaModel.buscarCPUId(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarQtdMaquinaAlerta(req, res) {
 
    medidaModel.buscarQtdMaquinaAlerta().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarQtdProcessadorAlerta(req, res) {
 
    medidaModel.buscarQtdProcessadorAlerta().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function MaquinasAlerta(req, res) {
 
    medidaModel.MaquinasAlerta().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMaquinasUsuario(req, res) {
 
    var idNovo = req.params.idNovo;

    medidaModel.buscarMaquinasUsuario(idNovo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarRedeInovacao(req, res) {


    medidaModel.buscarRedeInovacao().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar asId últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarRede,
    buscarMemoria,
    buscarDisco,
    buscarCPU,
    buscarRedeId,
    buscarMemoriaId,
    buscarDiscoId,
    buscarCPUId,
    buscarQtdMaquinaAlerta,
    buscarQtdProcessadorAlerta,
    MaquinasAlerta,
    buscarMaquinasUsuario,
    buscarRedeInovacao
}