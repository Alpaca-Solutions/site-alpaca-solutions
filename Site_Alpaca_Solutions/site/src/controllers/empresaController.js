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

function listarEmpresa(req, res) {

  var idEmpresa = req.params.idEmpresa
   empresaModel.listarEmpresa(idEmpresa).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

// function deletarEmpresa(req, res) {
//   var idEmpresa = req.params.idEmpresa
//    empresaModel.deletarEmpresa(idEmpresa)
//   .then(
//       function (resultado) {
//           res.json(resultado);
//       }
//   )
//   .catch(
//       function (erro) {
//           console.log(erro);
//           console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
//           res.status(500).json(erro.sqlMessage);
//       }
//   );
// }

function atualizarEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa
  var dadosAtualizados = req.body;

 empresaModel.atualizarEmpresa(idEmpresa, dadosAtualizados)
  .then(function (resultado) {
    res.json(resultado);
  })
  .catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao realizar a atualização: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

// FIM




function cadastrarMaquina(req, res) {

  var ipMaquina = req.body.ipMaquinaServer;
  var sistemaOperacional = req.body.sistemaOperacionalServer;
  var NomeMaquina = req.body.NomeMaquinaServer;
  var nomeUnidade = req.body.nomeUnidadeServer;

  var rua = req.body.ruaServer;
  var bairro = req.body.bairroServer;
  var estado = req.body.estadoServer;
  var cep = req.body.cepServer;
  var cidade = req.body.cidadeServer;
  var numero = req.body.numeroServer;

    empresaModel
    .cadastrarMaquinas(
      cep, 
      rua, 
      numero, 
      bairro,  
      cidade, 
      estado,
      nomeUnidade,
      ipMaquina,
      sistemaOperacional,
      NomeMaquina
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
  listarEmpresa,
  atualizarEmpresa,
  cadastrarMaquina,
};
