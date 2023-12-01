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
      nomeFantasia,
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

function inserirEmpresa(nomeFantasia, razaoSocial, cnpj, fkEndereco) {
  return new Promise((resolve, reject) => {
    var query = `
    INSERT INTO Empresa (nomefantasia, razaoSocial, cnpj, ativo, fk_endereco)
    VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}', true, ${fkEndereco});
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
    INSERT INTO Telefone (numero, tipo, ativo, fkEmpresa)
    VALUES ('${numero}', 'celular', true, ${fkCliente});
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

function cadastrarUsuario(nomeFantasia, email, senha, fkClienteUsuario) {
  return new Promise((resolve, reject) => {
    var query = `
    INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
    VALUES ('${nomeFantasia}','${email}', '${senha}', '1', '1', true, ${fkClienteUsuario});
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
// CRUD DA EMPRESA:

function recuperarEmpresaCompletaPorId(id) {
  return new Promise((resolve, reject) => {
    console.log(`Recuperando empresa completa com ID ${id}`);

    db.query(
      `SELECT * FROM Endereco
      JOIN Empresa ON Empresa.fk_endereco = Endereco.idEndereco
      JOIN Telefone ON Telefone.fkEmpresa = Empresa.idEmpresa
      JOIN Usuario ON Usuario.fkEmpresaUsuario = Empresa.idEmpresa 
      WHERE Usuario.ativo = true AND idEmpresa = ?;`,
      [id],
      (error, resultado) => {
        if (error) {
          console.error(`Erro ao recuperar empresa: ${error}`);
          reject(error);
        } else {
          console.log(`Empresa recuperada com sucesso`);
          resolve(resultado);
        }
      }
    );
  });
}

function atualizarEmpresaCompletaPorId( id, nomeFantasia, razaoSocial, cnpj, rua, bairro, estado, cep, cidade, numero, email, senha, telefone) {
  return new Promise((resolve, reject) => {
    console.log(`Atualizando empresa completa com ID ${id}`);

    db.transaction(async (conn) => {
      try {
        await conn.query('UPDATE Endereco SET cep = ?, rua = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, ativo = true WHERE id_endereco = ?;', [cep, rua, numero, bairro,  cidade, estado, id]);
        await conn.query('UPDATE Empresa SET nomefantasia = ?, razaoSocial = ?, cnpj = ?, ativo = true, fk_endereco = 1 WHERE id_empresa = ?;', [nomeFantasia, razaoSocial, cnpj, id]);
        await conn.query('UPDATE Telefone SET numero = ?, tipo = "Celular", ativo = true WHERE id_telefone = ?;', [telefone, id]);
        await conn.query('UPDATE Usuario SET email = ?, senha = ? WHERE fkEmpresaUsuario = ?;', [email, senha, id]);

        console.log(`Em presa atualizada com sucesso`);
        resolve(true);
      } catch (error) {
        console.error(`Erro ao atualizar empresa: ${error}`);
        reject(error);
      }
    });
  });
}

function excluirEmpresaCompletaPorId(id) {
  return new Promise((resolve, reject) => {
    console.log(`Excluindo empresa completa com ID ${id}`);

    db.transaction(async (conn) => {
      try {
        await conn.query('UPDATE Usuario SET ativo = false WHERE fkEmpresaUsuario = ?', [id]);
        await conn.query('UPDATE Telefone SET ativo = false WHERE fkEmpresa = ?', [id]);
        await conn.query('UPDATE Endereco SET ativo = false WHERE idEndereco = ?', [id]);
        await conn.query('UPDATE Empresa SET ativo = false WHERE idEmpresa = ?', [id]);

        console.log(`Empresa excluída com sucesso`);
        resolve(true);
      } catch (error) {
        console.error(`Erro ao excluir empresa: ${error}`);
        reject(error);
      }
    });
  });
}

// fim


// Cadastrando Maquinas
async function cadastrarMaquinas(
  ipServidor,
  sistemaOperacional,
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

function cadastrarMaquina(NomeServidor, ipServidor, sistemaOperacional, fkUnidade) {
  return new Promise((resolve, reject) => {
    var query = `
      INSERT INTO Maquina(NomeMaquina, ipMaquina, sistemaOperacional, statusMaquina, ativo, fkEmpresaMaquina, fkUnidade)
      VALUES('${NomeServidor}', '${ipServidor}', '${sistemaOperacional}', true, true, '1', ${fkUnidade});
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
  recuperarEmpresaCompletaPorId,
  atualizarEmpresaCompletaPorId,
  excluirEmpresaCompletaPorId,
  cadastrarMaquinas,
  cadastrarEnderecoMaquina,
  cadastrarUnidade,
  cadastrarMaquina
};