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

// CRUD DA EMPRESA

function recuperarEmpresaCompleta(req, res) {
  var id = req.params.id;

  empresaModel
    .recuperarEmpresaCompletaPorId(id)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(404).json({ mensagem: 'Empresa não encontrada' });
      }
    })
    .catch((error) => {
      res.status(500).json({ mensagem: 'Erro ao recuperar empresa', error: error });
    });
}

function atualizarEmpresaCompleta(req, res) {
  var id = req.params.id;
  var empresaData = req.body.empresaData;
  var enderecoData = req.body.enderecoData;
  var telefoneData = req.body.telefoneData;
  var usuarioData = req.body.usuarioData;

  empresaModel
    .atualizarEmpresaCompletaPorId(id, empresaData, enderecoData, telefoneData, usuarioData)
    .then((resultado) => {
      res.status(200).json({ mensagem: 'Empresa atualizada com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ mensagem: 'Erro ao atualizar empresa', error: error });
    });
}

function excluirEmpresaCompleta(req, res) {
  var id = req.params.id;

  empresaModel
    .excluirEmpresaCompletaPorId(id)
    .then((resultado) => {
      res.status(200).json({ mensagem: 'Empresa excluída com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ mensagem: 'Erro ao excluir empresa', error: error });
    });
}

// FIM




function cadastrarMaquina(req, res) {

  var ipServidor = req.body.ipServidorServer;
  var sistemaOperacional = req.body.sistemaOperacionalServer;
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
  recuperarEmpresaCompleta,
  atualizarEmpresaCompleta,
  excluirEmpresaCompleta,
  cadastrarMaquina,
};
