const empresaModel = require("../models/empresaModel");

// function buscarPorCnpj(req, res) {
//   const cnpj = req.query.cnpj;

//   empresaModel.buscarPorCnpj(cnpj)
//     .then((resultado) => {
//       res.status(200).json(resultado);
//     })
//     .catch((error) => {
//       res.status(500).json({ mensagem: "Erro ao buscar por CNPJ" });
//     });
// }

// function listar(req, res) {
//   empresaModel.listar()
//     .then((resultado) => {
//       res.status(200).json(resultado);
//     })
//     .catch((error) => {
//       res.status(500).json({ mensagem: "Erro ao listar empresas" });
//     });
// }

// function buscarPorId(req, res) {
//   const id = req.params.id;

//   empresaModel.buscarPorId(id)
//     .then((resultado) => {
//       res.status(200).json(resultado);
//     })
//     .catch((error) => {
//       res.status(500).json({ mensagem: "Erro ao buscar por ID" });
//     });
// }

// function cadastrar(req, res) {
//   const cnpj = req.body.cnpjServer;
//   const razaoSocial = req.body.razaoSocialServer;

//   empresaModel.buscarPorCnpj(cnpj)
//     .then((resultado) => {
//       if (resultado.length > 0) {
//         res.status(400).json({ mensagem: `A empresa com o CNPJ ${cnpj} já existe` });
//       } else {
//         empresaModel.cadastrar(razaoSocial, cnpj)
//           .then((resultado) => {
//             res.status(201).json(resultado);
//           })
//           .catch((error) => {
//             res.status(500).json({ mensagem: "Erro ao cadastrar empresa" });
//           });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ mensagem: "Erro ao buscar por CNPJ" });
//     });
// }

function cadastrar(req, res) {
  const rua = req.body.ruaServer;
  const bairro = req.body.bairroServer;
  const estado = req.body.estadoServer;
  const cep = req.body.cepServer;
  const cidade = req.body.cidadeServer;
  const numero = req.body.numeroServer;

  const nomeFantasia = req.body.nomeFantasiaServer;
  const razaoSocial = req.body.razaoSocialServer;
  const cnpj = req.body.cnpjServer;
  const email = req.body.emailServer;
  const senha = req.body.senhaServer;

  empresaModel.cadastrarEndereco(rua, bairro, estado, cep, cidade, numero)
    .then((resultadoEndereco) => {
      empresaModel.cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj)
        .then((resultadoEmpresa) => {
          empresaModel.cadastrarUsuario(nome, email, senha)
            .then((resultadoUsuario) => {
              res.status(201).json({
                endereco: resultadoEndereco,
                empresa: resultadoEmpresa,
                usuario: resultadoUsuario
              });
            })
            .catch((error) => {
              res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
            });
        })
        .catch((error) => {
          res.status(500).json({ mensagem: "Erro ao cadastrar empresa" });
        });
    })
    .catch((error) => {
      res.status(500).json({ mensagem: "Erro ao cadastrar endereço" });
    });
}

module.exports = {
  cadastrar
};
