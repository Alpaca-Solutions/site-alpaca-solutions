var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
  var nomeFantasia = req.body.nomeFantasiaServer;
  var razaoSocial = req.body.razaoSocialServer;
  var cnpj = req.body.cnpjServer;

  var rua = req.body.ruaServer;
  var bairro = req.body.bairroServer;
  var estado = req.body.estadoServer;
  var cep = req.body.cepServer;
  var cidade = req.body.cidadeServer;
  var numero = req.body.numeroServer;

  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var telefone = req.body.telefoneServer;

  empresaModel
    .cadastrarEmpresa(
      nomeFantasia,
      razaoSocial,
      cnpj,
      rua,
      bairro,
      estado,
      cep,
      cidade,
      numero,
      email,
      senha,
      telefone
    )
    .then((resultado) => {
      res.status(201).json(resultado);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

function cadastrarMaquina(req, res) {

  var ipServidor = req.body.ipServidorServer;
  var sistemaOperacional = req.body.sistemaOperacionalServer;
  var tipoInstancia = req.body.tipoInstanciaServer;
  var statusServidor = req.body.statusServidorServer;
  var NomeServidor = req.body.NomeServidorServer;
  var nomeUnidade = req.body.NomeUnidadeServer;

  var rua = req.body.ruaServer;
  var bairro = req.body.bairroServer;
  var estado = req.body.estadoServer;
  var cep = req.body.cepServer;
  var cidade = req.body.cidadeServer;
  var numero = req.body.numeroServer;

    empresaModel
    .cadastrarMaquinas(
      ipServidor,
      sistemaOperacional,
      tipoInstancia,
      statusServidor,
      NomeServidor,
      nomeUnidade,
      rua,
      bairro,
      estado,
      cep,
      cidade,
      numero,
    )
    .then((resultado) => {
      res.status(201).json(resultado);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });

}



module.exports = {
  cadastrar,
  cadastrarMaquina
};
