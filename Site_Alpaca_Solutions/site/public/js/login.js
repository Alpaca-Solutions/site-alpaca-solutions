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