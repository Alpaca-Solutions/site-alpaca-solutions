var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
  
    if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
    } else {
      usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
  
          if (resultadoAutenticar.length == 1) {
            console.log(resultadoAutenticar);
  
            res.json({
              id: resultadoAutenticar[0].id,
              email: resultadoAutenticar[0].email,
              nome: resultadoAutenticar[0].nome,
              senha: resultadoAutenticar[0].senha
            });
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }
  }

  function cadastrarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoAcesso = req.body.tipoAcessoServer;
    var nivelAcesso = req.body.nivelAcessoServer;
    var fk_usuario = req.body.idUsuarioServer
  
    usuarioModel
      .cadastrarUsuario(
        nome,
        email,
        senha,
        tipoAcesso,
        nivelAcesso,
        fk_usuario
      )
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
module.exports = {
    autenticar,
    cadastrarUsuario
}