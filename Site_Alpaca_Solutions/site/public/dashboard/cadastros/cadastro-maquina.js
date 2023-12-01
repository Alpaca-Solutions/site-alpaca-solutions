function cadastrarMaquina() {
    // cadastrar na tabela maquina
    const NomeServidor = document.getElementById("NomeServidor").value;
    const ipServidor = document.getElementById("ipServidor").value;
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
  
    fetch("/empresas/cadastrarMaquina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipServidorServer: ipServidor,
        sistemaOperacionalServer: sistemaOperacional,
        NomeServidorServer: NomeServidor,
        nomeUnidadeServer: NomeUnidade,
        ruaServer: rua,
        bairroServer: bairro,
        estadoServer: estado,
        cepServer: cep,
        cidadeServer: cidade,
        numeroServer: numero,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          alert("O maquina foi cadastro com sucesso")

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