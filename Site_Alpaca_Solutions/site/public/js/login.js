function validar_email(){
    let input_email = document.getElementById("input_email");
    let label_email = document.getElementById("email_label");
    var email = input_email.value.toLowerCase();

    // Guys aqui ele converte para minusculo para validar na linha 21
    email = email.toLowerCase();


    // aqui verifica se ta vazio
    if(email == ""){
        input_email.classList.add("erro_input");
        label_email.innerHTML = "Campo vazio";
        label_email.style.color = "red";
        input_email.classList.remove("input_ok");   
    }

    // aqui aplicamos a regra de negocio que tem que ter o final @admin.com ou então é um chefe por exemplo
    // que usar um email normal
  
    else if(email.length < 7 || !email.endsWith("@admin.com") && !email.endsWith("@gmail.com")){
       input_email.classList.add("erro_input");
       label_email.innerHTML = "Email inválido";
       label_email.style.color = "red";
       input_email.classList.remove("input_ok");
    }
    else{
        input_email.classList.remove("erro_input");
        label_email.innerHTML = "Email";
        input_email.classList.add("input_ok");
        label_email.style.color = "#ffff";
    }

}

function validar_senha(){
    let input_senha = document.getElementById("input_senha");
    let label_senha = document.getElementById("senha_label");
    var senha = input_senha.value;


    if(senha == ""){
        input_senha.classList.add("erro_input");
        input_senha.classList.remove("senha_media");
        label_senha.style.color = "red";
        input_senha.classList.remove("input_ok");
        label_senha.innerHTML = "Campo vazio";
    }
   else if(senha.length < 8){
        input_senha.classList.add("erro_input");
        input_senha.classList.remove("senha_media");
        label_senha.style.color = "red";
        label_senha.innerHTML = "Senha inválida";
    }
    else if(senha.length >=8 && senha.length < 10){
        input_senha.classList.add("senha_media");
        input_senha.classList.remove("erro_input");
        input_senha.classList.remove("input_ok");
        label_senha.innerHTML = "Senha nota 7";
        label_senha.style.color = "rgb(255, 151, 15)";
    }
    else{
        input_senha.classList.remove("erro_input");
        input_senha.classList.remove("senha_media");
        input_senha.classList.add("input_ok");
        label_senha.innerHTML = "Senha";
        label_senha.style.color = "#FFFF"
    }


}

function entrar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
  
 
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);
  
    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar
      })
    })
      .then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");
  
        if (resposta.ok) {
          console.log("Os dados é " + resposta);

          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));

              sessionStorage.Email = json.email;
              sessionStorage.NomeUsuarioLogin = json.nome;
              sessionStorage.idUsuario = json.idUsuario;
              sessionStorage.fkEmpresa = json.id;
              sessionStorage.idEmpresaLogin = json.idEmpresa;
              sessionStorage.tipoAcessoLogin = json.tipoAcesso;
              sessionStorage.idUsuarioLogin = json.idUsuario;
              sessionStorage.Ativo = json.ativo;
              sessionStorage.TipoAcesso = json.tipo

              let timerInterval;
              Swal.fire({
                title: '<h2 class="textoCadastro">Login realizado com sucesso!</h2>',
                html: `
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="assets/icon/logo_alpaca_preto2.png" alt="Alpaca feliz" style="width: 200px; height: 200px;">
                    <span class="textoCadastro">Só um minutinho estamos verificando seus dados  !</span>
                    <div style="margin-top: 10px;"></div>
                  </div>`,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                  Swal.showLoading();
                  timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('b').textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then(() => {
                Swal.fire({
                  title: 'Login realizado com sucesso!',
                  text: 'Agora você pode visualizar os gráficos de suas máquinas!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#4CAF50'
                }).then(() => {
                  window.location = "../dashboard/dahsboards/dashboard-geral.html";
                });
              });
              
              
                     
        // apenas para exibir o loading
          });
        } else {
          Swal.fire({
            title: '<h2 class="textoCadastro">Login Falhou!</h2>',
            html: `
              <div style="display: flex; flex-direction: column; align-items: center;">
                <img src="assets/icon/logo_alpaca_preto2.png" alt="Alpaca feliz" style="width: 200px; height: 200px;">
                <span class="textoCadastro">Não Conseguimos encontrar seu email ou senha :(</span>
                <div style="margin-top: 10px;"></div>
              </div>`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          });

          console.log("Houve um erro ao tentar realizar o login!");
  
          resposta.text().then(texto => {
            console.error(texto);
            // Trate o erro aqui de acordo com suas necessidades
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });
  
    return false;
  }

// function entrar() {


//     var emailVar = input_email.value;
//     var senhaVar = input_senha.value;
    
//     if (emailVar == "" || senhaVar == "") {
//         cardErro.style.display = "block"
//         alert(`Mensagem de erro para todos os campos em branco`);
//         finalizarAguardar();
//         return false;
//     }
    
//     console.log("FORM LOGIN: ", emailVar);
//     console.log("FORM SENHA: ", senhaVar);
    
//     fetch("/usuarios/autenticar", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             emailServer: emailVar,
//             senhaServer: senhaVar
//         })
//     }).then(function (resposta) {
//         console.log("ESTOU NO THEN DO entrar()!")
    
//         if (resposta.ok) {
//             console.log(resposta);
        
//             resposta.json().then(json => {
//                 console.log(json);
//                 console.log(JSON.stringify(json));
    
//                 sessionStorage.EMAIL_USUARIO = json.email;
//                 sessionStorage.NOME_USUARIO = json.nomeFantasia;
//                 sessionStorage.ID_USUARIO = json.fkEmpresaUsuario;
    

    
//                 setTimeout(function () {
//                         window.location = "../dashboard/dahsboards/dashboard-geral.html";
//                 }, 1000); // apenas para exibir o loading
//             });
    
//         } else {
    
//             console.log("Houve um erro ao tentar realizar o login!");
    
//             resposta.text().then(texto => {
//                 console.error(texto);
//                 finalizarAguardar(texto);
//             });
//         }
    
//     }).catch(function (erro) {
//         console.log(erro);
//     })
    
//     return false;
//     }