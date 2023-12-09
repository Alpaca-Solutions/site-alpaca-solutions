function cadastrarUsuario(){

    const idVar = sessionStorage.ID_USUARIO;
    const emailVar = email.value
    const senhaVar = senha.value
    const nomeVar = nome.value
    const tipoAcessoVar = document.getElementById("tipoAcesso")
    const nivelAcessoVar =  nivelAcesso.value
    let fkEndereco = sessionStorage.fkEmpresa

    console.log(sessionStorage.fkEmpresa)

 fetch(`/usuarios/cadastrarUsuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          nomeServer: nomeVar,
          emailServer: emailVar,
          senhaServer: senhaVar,
          tipoAcessoServer: tipoAcessoVar, 
          nivelAcessoServer: nivelAcessoVar,
          idUsuarioServer: fkEndereco
          
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
    
          if (resposta.ok) {
            alert("O usuário foi cadastrado com sucesso!")

            setTimeout(function () {
                  window.location = "../listas/lista-usuario.html";
                }, 1000);
          } else {
            alert("Erro ao realizar cadastro!");
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    }
