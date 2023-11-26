function cadastrarUsuario(){

    const idVar = sessionStorage.ID_USUARIO;
    const emailVar = email.value
    const senhaVar = senha.value
    const nomeVar = nome.value
    const tipoAcessoVar = tipoAcesso.value
    const nivelAcessoVar =  nivelAcesso.value

    fetch("/usuarios/cadastrarUsuario", {
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
          idUsuarioServer: idVar
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
    
          if (resposta.ok) {
            setTimeout(() => {
              window.location = "cadastro-usuario.html";
            }, 2000);
          } else {
            alert("Erro ao realizar cadastro!");
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    }
