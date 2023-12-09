var database = require("../database/config");

//CADASTRANDO EMPRESA

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

    console.log("Resultado na nuvem " + insertEndereco)
    // Inserir a empresa
    var insertEmpresa = await inserirEmpresa(
      nomeFantasia,
      razaoSocial,
      cnpj,
      insertEndereco.insertId,
      email,
      senha,
    );
    console.log("Resultado na nuvem " + insertEndereco)
   
    // Inserir o telefone
    var insertTelefone = await cadastrarTelefone(
      telefone,
      insertEmpresa.insertId
    );

    return insertEmpresa;
  }catch (error) {
    console.error('Erro ao cadastrar empresa:', error);
    throw error;
  }
}

function cadastrarEndereco(rua, bairro, estado, cep, cidade, numero) {
  return new Promise((resolve, reject) => {


    if (process.env.AMBIENTE_PROCESSO == "producao") {
    var query = `
    INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
    VALUES ('${cep}', '${rua}', '${numero}', '${bairro}', '${cidade}', '${estado}', 1);
    `;
    }

    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      var query = `
      INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
      VALUES ('${cep}', '${rua}', '${numero}', '${bairro}', '${cidade}', '${estado}', true);
      `;
    }
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

function inserirEmpresa(nomeFantasia, razaoSocial, cnpj, fkEndereco, email , senha) {
  return new Promise((resolve, reject) => {
    console.log("Node.js Inserindo no banco - Dados que estão chegando:");
    console.log("Nome Fantasia:", nomeFantasia);
    console.log("Razão Social:", razaoSocial);
    console.log("CNPJ:", cnpj);
    console.log("FK Endereço:", fkEndereco);
    console.log("Email:", email);
    console.log("Senha:", senha);

    if (process.env.AMBIENTE_PROCESSO == "producao") {
    var query = `
      INSERT INTO Empresa (email , senha , nomefantasia, razaoSocial, cnpj, ativo, fk_endereco)
      VALUES ('${email}' , '${senha}', '${nomeFantasia}', '${razaoSocial}', '${cnpj}', 1, ${fkEndereco});
    `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
      var query = `
      INSERT INTO Empresa (email , senha , nomefantasia, razaoSocial, cnpj, ativo, fk_endereco)
      VALUES ('${email}' , '${senha}', '${nomeFantasia}', '${razaoSocial}', '${cnpj}', true, ${fkEndereco});
    `;
    }

    console.log("Executando a instrução SQL: \n" + query);

    database
      .executar(query)
      .then((result) => {
        console.log("Inserção bem-sucedida. Resultado:", result);
        resolve(result);
      })
      .catch((error) => {
        console.error("Erro durante a inserção:", error);
        reject(error);
      });
  });
}


function cadastrarTelefone(telefone, fkCliente) {
  return new Promise((resolve, reject) => {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
   
    var query = `
    INSERT INTO Telefone (numero, tipo, ativo, fkEmpresa)
    VALUES ('${telefone}', 'celular', 1, ${fkCliente});
    `;

    }

    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
      var query = `
      INSERT INTO Telefone (numero, tipo, ativo, fkEmpresa)
      VALUES ('${telefone}', 'celular', true, ${fkCliente});
      `;
    }
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

// function cadastrarUsuario(nomeFantasia, email, senha, fkClienteUsuario) {
//   return new Promise((resolve, reject) => {
//     var query = `
//     INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
//     VALUES ('${nomeFantasia}','${email}', '${senha}', '1', '1', true, ${fkClienteUsuario});
//     `;

//     console.log("Executando a instrução SQL: \n" + query);
//     database
//       .executar(query)
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
// CRUD DA EMPRESA:

function listarEmpresa(idEmpresa) {
  var instrucao = `
  SELECT *
  FROM Endereco
  JOIN Empresa ON Empresa.fk_endereco = Endereco.idEndereco
  JOIN Telefone ON Telefone.fkEmpresa = Empresa.idEmpresa
  JOIN Usuario ON Usuario.fkEmpresa = Empresa.idEmpresa
  WHERE idEmpresa = ${idEmpresa} LIMIT 1;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function atualizarEmpresa(idEmpresa, dadosAtualizados) {
  var instrucao1 = `UPDATE Empresa
                    SET nomeFantasia = '${dadosAtualizados.nomeFantasia}',
                        razaoSocial = '${dadosAtualizados.razaoSocial}',
                        cnpj = '${dadosAtualizados.cnpj}'
                    WHERE idEmpresa = ${idEmpresa}`;

  var instrucao2 = `UPDATE Endereco
                    SET cep = '${dadosAtualizados.cep}',
                        rua = '${dadosAtualizados.rua}',
                        numero = '${dadosAtualizados.numero}',
                        bairro = '${dadosAtualizados.bairro}',
                        cidade = '${dadosAtualizados.cidade}',
                        estado = '${dadosAtualizados.estado}'
                    WHERE idEndereco = ${dadosAtualizados.idEndereco}`;

  
  console.log("Executando a instrução SQL 1: \n" + instrucao1);
  console.log("Executando a instrução SQL 2: \n" + instrucao2);

  return Promise.all([
      database.executar(instrucao1),
      database.executar(instrucao2)
  ]);
}

// fim

// Cadastrando Maquinas
async function cadastrarMaquinas(
  cep, 
  rua, 
  numero, 
  bairro,  
  cidade, 
  estado,
  nomeUnidade,
  ipMaquina,
  sistemaOperacional,
  NomeMaquina
) {
  try {
    // Inserir o endereço
    var insertEndereco = await cadastrarEnderecoMaquina(
      cep, 
      rua, 
      numero, 
      bairro,  
      cidade, 
      estado
    );

    // Inserir a Unidade
    var insertUnidade = await cadastrarUnidade(
      nomeUnidade,
      insertEndereco.insertId
    );

    // Inserir a máquina
    var insertMaquina = await cadastrarMaquina(
      NomeMaquina,
      ipMaquina,
      sistemaOperacional,
      insertUnidade.insertId
    );

    return insertMaquina;
  } catch (error) {
    throw error;
  }
}
function cadastrarEnderecoMaquina(cep, rua, numero, bairro,  cidade, estado) {
  return new Promise((resolve, reject) => {
    var query = `
    INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
    VALUES ('${cep}', '${rua}', '${numero}', '${bairro}', '${cidade}', '${estado}', true);
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
    INSERT INTO Unidade (nomeInstituicao, ativo, fkEndereco)
    VALUES('${nomeUnidade}', true, ${fkEndereco});      
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

function cadastrarMaquina(NomeMaquina, ipMaquina, sistemaOperacional, fkUnidade) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Maquina(hostname, ipMaquina, sistemaOperacional, statusMaquina, fkEmpresa, fkUnidade)
      VALUES('${NomeMaquina}', '${ipMaquina}', '${sistemaOperacional}', true, '1', ${fkUnidade});
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
  cadastrarMaquinas,
  atualizarEmpresa,
  listarEmpresa,
  cadastrarEnderecoMaquina,
  cadastrarUnidade,
  cadastrarMaquina
};