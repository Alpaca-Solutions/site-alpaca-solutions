function validar_email(){
    let input_email = document.getElementById("input_email");
    let label_email = document.getElementById("email_label");
    var email = input_email.value

    if(email.length < 7 || !email.endsWith("@admin.com") && !email.endsWith("@gmail.com")){
       input_email.classList.add("erro_input");
       label_email.style.color = "red"
    }
    else{
        input_email.classList.remove("erro_input");
        label_email.style.color = "#ffff"
    }

}

function validar_senha(){
    let input_senha = document.getElementById("input_senha");
    let label_senha = document.getElementById("senha_label");
    var senha = input_senha.value

    if(senha.length < 8){
        input_senha.classList.add("erro_input");
        input_senha.classList.remove("senha_media");
        label_senha.style.color = "red"
    }
    else if(senha.length >=8 && senha.length < 10){
        input_senha.classList.add("senha_media");
        input_senha.classList.remove("erro_input");
        label_senha.style.color = "rgb(255, 151, 15)"
    }
    else{
        input_senha.classList.remove("erro_input");
        input_senha.classList.remove("senha_media");
        label_senha.style.color = "#ffff"
    }


}