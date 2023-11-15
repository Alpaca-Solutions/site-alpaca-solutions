var database = require("../database/config");

async function cadastrarEmpresa(
  nomeFantasia,
  razaoSocial,
  cnpj,
  rua,
  bairro,
  estado,
  cep,
  cidade,
  numero,
  email,
  senha,
  telefone
) {
  try {
    // Inserir o endereço
    var insertEndereco = await cadastrarEndereco(
      rua,
      bairro,
      estado,
      cep,
      cidade,
      numero
    );

    // Inserir a empresa
    var insertEmpresa = await inserirEmpresa(
      nomeFantasia,
      razaoSocial,
      cnpj,
      insertEndereco.insertId
    );

    // Inserir o telefone
    var insertTelefone = await cadastrarTelefone(
      telefone,
      insertEmpresa.insertId
    );

    // Inserir o usuário
    var insertUsuario = await cadastrarUsuario(
      email,
      senha,
      insertEmpresa.insertId
    );

    return insertEmpresa;
  } catch (error) {
    throw error;
  }
}

function cadastrarEndereco(rua, bairro, estado, cep, cidade, numero) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Endereco (rua, bairro, estado, cep, cidade, numero)
      VALUES ('${rua}', '${bairro}', '${estado}', '${cep}', '${cidade}', '${numero}');
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function inserirEmpresa(nomeFantasia, razaoSocial, cnpj, fkEndereco) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Empresa (nome_fantasia, razao_social, cnpj, fk_endereco)
      VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}', ${fkEndereco});
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function cadastrarTelefone(numero, fkCliente) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Telefone (numero, tipo, fk_cliente)
      VALUES ('${numero}', 'celular', ${fkCliente});
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function cadastrarUsuario(email, senha, fkClienteUsuario) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Usuario (email, senha, tipo_acesso, nivel_acesso, fk_cliente_usuario)
      VALUES ('${email}', '${senha}', '1', '1', ${fkClienteUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function cadastrarMaquinas(
  ipServidor,
  sistemaOperacional,
  tipoInstancia,
  statusServidor,
  NomeServidor,
  nomeUnidade,
  rua,
  bairro,
  estado,
  cep,
  cidade,
  numero
) {
  try {
    // Inserir o endereço
    var insertEndereco = await cadastrarEnderecoMaquina(
      rua,
      bairro,
      estado,
      cep,
      cidade,
      numero
    );

    // Inserir a Unidade
    var insertUnidade = await cadastrarUnidade(
      nomeUnidade,
      insertEndereco.insertId
    );

    // Inserir a máquina
    var insertMaquina = await cadastrarMaquina(
      NomeServidor,
      ipServidor,
      sistemaOperacional,
      tipoInstancia,
      statusServidor,
      insertUnidade.insertId
    );

    return insertMaquina;
  } catch (error) {
    throw error;
  }
}
function cadastrarEnderecoMaquina(rua, bairro, estado, cep, cidade, numero) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Endereco (rua, bairro, estado, cep, cidade, numero)
      VALUES ('${rua}', '${bairro}', '${estado}', '${cep}', '${cidade}', '${numero}');
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function cadastrarUnidade(nomeUnidade, fkEndereco) {
  return new Promise((resolve, reject) => {
    var query = `
    INSERT INTO Unidade (nomeUnidade, fkEndereco)
    VALUES('${nomeUnidade}', ${fkEndereco});      
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function cadastrarMaquina(NomeServidor, ipServidor, sistemaOperacional,tipoInstancia, statusServidor, fkUnidade) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Maquina(NomeServidor, ipServidor, sistemaOperacional,tipoInstancia, statusServidor,  fkUnidade)
      VALUES('${NomeServidor}', '${ipServidor}', '${sistemaOperacional}','${tipoInstancia}', '${statusServidor}',  ${fkUnidade});
    `;

    console.log("Executando a instrução SQL: \n" + query);
    database
      .executar(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


module.exports = {
  cadastrarEmpresa,
  cadastrarEndereco,
  cadastrarTelefone,
  cadastrarUsuario,
  cadastrarMaquinas,
  cadastrarEnderecoMaquina,
  cadastrarUnidade,
  cadastrarMaquina
};
