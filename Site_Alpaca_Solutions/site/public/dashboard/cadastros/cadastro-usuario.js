function cadastrarUsuario(){

    const emailVar = document.getElementById("email").value;
    const senhaVar = document.getElementById("senha").value;
    const nomeVar= document.getElementById("nome").value;
    const tipoAcessoVar= document.getElementById("tipoAcesso").value;
    const nivelAcessoVar= 1;

    fetch("/usuarios/cadastrar", {
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
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
    
          if (resposta.ok) {
            setTimeout(() => {
              window.location = "login.html";
            }, 2000);
          } else {
            alert("Erro ao realizar cadastro!");
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    }
