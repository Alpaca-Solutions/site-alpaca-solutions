function cadastrarMaquina() {
    // cadastrar na tabela maquina
    const NomeMaquina = document.getElementById("NomeMaquina").value;
    const ipMaquina = document.getElementById("ipMaquina").value;
    const sistemaOperacional = document.getElementById("sistemaOperacional").value;
  
  
    // cadastrar na Unidade
    const NomeUnidade = document.getElementById("nomeUnidade").value;
  
    // cadastrar em endereco
    const rua = document.getElementById("rua").value;
    const bairro = document.getElementById("bairro").value;
    const estado = document.getElementById("estado").value;
    const cep = document.getElementById("cep").value;
    const cidade = document.getElementById("cidade").value;
    const numero = document.getElementById("numero").value;
    let fkEmpresaMaquina = sessionStorage.fkEmpresa;
  
    fetch("/empresas/cadastrarMaquina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipMaquinaServer: ipMaquina,
        sistemaOperacionalServer: sistemaOperacional,
        NomeMaquinaServer: NomeMaquina,
        nomeUnidadeServer: NomeUnidade,
        ruaServer: rua,
        bairroServer: bairro,
        estadoServer: estado,
        cepServer: cep,
        cidadeServer: cidade,
        numeroServer: numero,
        fkEmpresaServer: fkEmpresaMaquina
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          Swal.fire({
            title: '<h2 class="textoCadastro">Máquina Cadastrada com Sucesso :)</h2>',    
            icon: "success",
            confirmButtonColor: '#008000',
            confirmButtonText: 'Confirmar',
          });

          setTimeout(function () {
                window.location = "../listas/lista-maquina.html";
              }, 1000);
        } else {
          alert("Erro ao realizar cadastro!");
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }