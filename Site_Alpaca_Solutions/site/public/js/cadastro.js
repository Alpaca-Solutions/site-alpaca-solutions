// function validar_nome() {
//     let input_nome = document.getElementById("input_nome");
//     let label_nome = document.getElementById("nome_label");
//     var nome = input_nome.value


//     if (nome == "") {
//         input_nome.classList.add("erro_input");
//         label_nome.innerHTML = "Campo vazio";9
//         label_nome.style.color = "red";
//         input_nome.classList.remove("input_ok");
//     }
//     else if (nome.length < 3) {
//         input_nome.classList.add("erro_input");
//         label_nome.innerHTML = "Nome inválido";
//         label_nome.style.color = "red";
//         input_nome.classList.remove("input_ok");
//     }
//     else {
//         input_nome.classList.remove("erro_input");
//         label_nome.innerHTML = "Nome";
//         label_nome.style.color = "#FFFF";
//         input_nome.classList.add("input_ok");
//     }
// }

// function validar_email() {
//     let input_email = document.getElementById("input_email");
//     let label_email = document.getElementById("email_label");
//     var email = input_email.value

//     // Guys aqui ele converte para minusculo para validar na linha 21
//     email = email.toLowerCase();


//     // aqui verifica se ta vazio
//     if (email == "") {
//         input_email.classList.add("erro_input");
//         label_email.innerHTML = "Campo vazio";
//         label_email.style.color = "red";
//         input_email.classList.remove("input_ok");
//     }

//     // aqui aplicamos a regra de negocio que tem que ter o final @admin.com ou então é um chefe por exemplo
//     // que usar um email normal

//     else if (email.length < 7 || !email.endsWith("@admin.com") && !email.endsWith("@gmail.com")) {
//         input_email.classList.add("erro_input");
//         label_email.innerHTML = "Email inválido";
//         label_email.style.color = "red";
//         input_email.classList.remove("input_ok");
//     }
//     else {
//         input_email.classList.remove("erro_input");
//         label_email.innerHTML = "Email";
//         input_email.classList.add("input_ok");
//         label_email.style.color = "#ffff";
//     }

// }
// function validar_so() {
//     let input_so = document.getElementById("input_so");
//     let label_so = document.getElementById("sistema_label");
//     var input_sistema_operacional = input_so.value

//     input_sistema_operacional = input_sistema_operacional.toLowerCase()


//     if (input_sistema_operacional == "") {
//         input_so.classList.add("erro_input");
//         label_so.innerHTML = "Campo Vazio";
//         label_so.style.color = "red";
//         input_so.classList.remove("input_ok");
//     }

//     else if (input_sistema_operacional != "windows" && input_sistema_operacional != "linux" && input_sistema_operacional != "macos") {
//         input_so.classList.add("erro_input");
//         label_so.innerHTML = "SO Inválido";
//         label_so.style.color = "red";
//         input_so.classList.remove("input_ok");
//     }
//     else {
//         input_so.classList.remove("erro_input");
//         label_so.innerHTML = "Sistema Operacional";
//         label_so.style.color = "#FFFF";
//         input_so.classList.add("input_ok");
//     }
// }

// function validar_senha(){
//     let input_senha = document.getElementById("input_senha");
//     let label_senha = document.getElementById("senha_label");
//     var senha = input_senha.value;


//     if(senha == ""){
//         input_senha.classList.add("erro_input");
//         input_senha.classList.remove("senha_media");
//         label_senha.style.color = "red";
//         input_senha.classList.remove("input_ok");
//         label_senha.innerHTML = "Campo vazio";
//     }
//    else if(senha.length < 8){
//         input_senha.classList.add("erro_input");
//         input_senha.classList.remove("senha_media");
//         label_senha.style.color = "red";
//         input_senha.classList.remove("input_ok");
//         label_senha.innerHTML = "Senha muito curta";
//     }
//     else if(senha.length >=8 && senha.length < 10){
//         input_senha.classList.add("senha_media");
//         input_senha.classList.remove("erro_input");
//         input_senha.classList.remove("input_ok");
//         label_senha.innerHTML = "Senha nota 7";
//         label_senha.style.color = "rgb(255, 151, 15)";
//     }
//     else{
//         input_senha.classList.remove("erro_input");
//         input_senha.classList.remove("senha_media");
//         input_senha.classList.add("input_ok");
//         label_senha.innerHTML = "Senha";
//         label_senha.style.color = "#FFFF"
//     }
// }

// function validar_confirmacao(senha){
//     let input_confirma_senha = document.getElementById("input_confirma_senha");
//     let label_senha = document.getElementById("confirma_senha_label");
//     let confirm_senha = input_confirma_senha.value;
  
  
//     if(confirm_senha == ""){
//         input_confirma_senha.classList.add("erro_input");
//         label_senha.style.color = "red";
//         input_confirma_senha.classList.remove("input_ok");
//         label_senha.innerHTML = "Campo vazio";   
//     }
//     else{
//     if (confirm_senha != senha) {
//         input_confirma_senha.classList.add("erro_input");
//         label_senha.style.color = "red";
//         input_confirma_senha.classList.remove("input_ok");
//         label_senha.innerHTML = "As senhas não coincidem.";
//     } else {
//         input_confirma_senha.classList.remove("erro_input");
//         input_confirma_senha.classList.add("input_ok");
//         label_senha.innerHTML = "Senha";
//         label_senha.style.color = "#FFFF";
//     }
// }
// document.getElementById("formulario").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const nome = document.getElementById("input_nome").value;
//     const email = document.getElementById("input_email").value;
//     const senha = document.getElementById("input_senha").value;
//     const confirmaSenha = document.getElementById("input_confirma_senha").value;
   
//     // Validação: Nenhum campo pode estar vazio
//     if (!nome || !email || !senha || !confirmaSenha) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Erro',
//             text: 'Todos os campos são obrigatórios!',
//         });
//         return;
//     }

//     // Validação: Email precisa ter @

//     if (!email.includes('@')) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Erro',
//             text: 'O email deve conter o símbolo "@"!',
//         });
//         return;
//     }

//     // Validação: Senha e Confirmação de Senha devem ser iguais
//     if (senha !== confirmaSenha) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Erro',
//             text: 'A senha e a confirmação de senha não coincidem!',
//         });
//         return;
//     }



//     Swal.fire({
//         icon: 'success',
//         title: 'Sucesso',
//         text: 'Formulário enviado com sucesso!',
//     });

// });
// }

function cadastrar() {
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo

  // tabela Usuario 
  const emailVar = document.getElementById("input_email").value;
  const senhaVar = document.getElementById("input_senha").value;
  const confirmacaoSenhaVar = document.getElementById("confirmacao_senha_input").value;

  //tabela empresa
  const nomeFantasiaVar = document.getElementById("input_nomeFantasia").value;
  const razaoSocialVar = document.getElementById("input_razaoSocial").value;
  const cnpjVar = document.getElementById("input_cnpj").value;

  //tabela endereço
  const ruaVar = document.getElementById("input_rua").value;
  const bairroVar = document.getElementById("input_bairro").value;
  const estadoVar = document.getElementById("input_estado").value;
  const cepVar = document.getElementById("input_cep").value;
  const cidadeVar = document.getElementById("input_cidade").value;
  const numeroVar = document.getElementById("input_numero").value;


  console.log("Valor de email saindo do front " + emailVar)
  console.log("Valor de senha saindo do front " + senhaVar)


  fetch("/empresas/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeFantasiaServer: nomeFantasiaVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      razaoSocialServer: razaoSocialVar,
      cnpjServer: cnpjVar,
      ruaServer: ruaVar,
      bairroServer: bairroVar,
      estadoServer: estadoVar,
      cepServer: cepVar,
      cidadeServer: cidadeVar,
      numeroServer: numeroVar,
      telefoneServer: numeroVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok || resposta.status === 200) {

         Swal.fire({
        title: '<h2 class="textoCadastro">Cadastro realizado com sucesso!</h2>',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img src="assets/icon/logo_alpaca_preto2.png" alt="Alpaca feliz" style="width: 200px; height: 200px;">
            <span class="textoCadastro" >Agora você aproveitar os serviços da alpaca!</span>
            <div style="margin-top: 10px;">
            </div>
          </div>
        `,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }, // Alterado para background em vez de imageUrl // Removido o ícone padrão do SweetAlert
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50' // Cor verde
      });
    

      setTimeout(() => {
          window.location = "login.html";
        }, 5000);
      } else {
        alert("Erro ao realizar cadastro!");
      }
    })
    .catch(function (resposta) {
      console.error("Erro no servidor:", error);
      res.status(500).send("Erro interno no servidor");
      console.log(`#ERRO: ${resposta}`);
    });
}

function atualizarEmpresa(idEmpresa) {
  //Recupere os valores dos campos de entrada para atualizar
  const emailVar = document.getElementById("email").value;
  const senhaVar = document.getElementById("senha").value;

  const nomeFantasiaVar = document.getElementById("nomeFantasia").value;
  const razaoSocialVar = document.getElementById("razaoSocial").value;
  const cnpjVar = document.getElementById("cnpj").value;

  const ruaVar = document.getElementById("rua").value;
  const bairroVar = document.getElementById("bairro").value;
  const estadoVar = document.getElementById("estado").value;
  const cepVar = document.getElementById("cep").value;
  const cidadeVar = document.getElementById("cidade").value;
  const numeroVar = document.getElementById("numero").value;

  fetch(`/empresas/${idEmpresa}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
      nomeFantasiaServer: nomeFantasiaVar,
      razaoSocialServer: razaoSocialVar,
      cnpjServer: cnpjVar,
      ruaServer: ruaVar,
      bairroServer: bairroVar,
      estadoServer: estadoVar,
      cepServer: cepVar,
      cidadeServer: cidadeVar,
      numeroServer: numeroVar,
    }),
  })
    .then(function (resposta) {
      console.log("Resposta: ", resposta);

      if (resposta.ok) {
        setTimeout(() => {
          window.location = "pagina_de_redirecionamento.html";
        }, 2000);
      } else {
        alert("Erro ao atualizar empresa!");
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}
