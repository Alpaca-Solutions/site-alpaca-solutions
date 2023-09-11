
document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("input_nome").value;
    const email = document.getElementById("input_email").value;
    const senha = document.getElementById("input_senha").value;
    const confirmaSenha = document.getElementById("input_confirma_senha").value;
   
    // Validação: Nenhum campo pode estar vazio
    if (!nome || !email || !senha || !confirmaSenha) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Todos os campos são obrigatórios!',
        });
        return;
    }

    // Validação: Email precisa ter @

    if (!email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'O email deve conter o símbolo "@"!',
        });
        return;
    }

    // Validação: Senha e Confirmação de Senha devem ser iguais
    if (senha !== confirmaSenha) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A senha e a confirmação de senha não coincidem!',
        });
        return;
    }



    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Formulário enviado com sucesso!',
    });
});