var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function cadastrarEmpresa(req, res) {

  var rua = req.body.ruaServer;
var bairro = req.body.bairroServer;
var estado = req.body.estadoServe;
var cep = req.body.cepServer;
var cidade = req.body.cidadeServer;
var numero = req.body.numeroServer;

var nome = req.body.nomeFantasiaServer;
var email = req.body.emailServer;
var senha = req.body.senhaServer;

var nomeFantasia = req.body.nomeFantasiaServer;
var razaoSocial = req.body.razaoSocialServer;
var cnpj = req.body.cnpjServer;

  empresaModel.cadastrarEndereco(rua, bairro, estado, cep, cidade, numero).then((resultado) => {
    res.status(201).json(resultado);
  });
  empresaModel.cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj).then((resultado) => {
    res.status(201).json(resultado);
  });
  empresaModel.cadastrarUsuario(nome, email, senha).then((resultado) => {
    res.status(201).json(resultado);
  });
};

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  cadastrarEmpresa,
  listar
};
