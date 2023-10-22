var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrarEndereco(rua, bairro, estado, cep, cidade, numero) {
  var query = `
  INSERT INTO Endereco (rua, bairro, estado, cep, cidade, complemento) VALUES
  ('${rua}','${bairro}','${estado}','${cep}','${cidade}','${numero}');
  `;

  console.log("Executando a instrução SQL: \n" + query);
  return database.executar(query);
}

async function cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj, rua, bairro, estado, cep, cidade, numero) {
  var insertEndereco = await cadastrarEndereco(rua, bairro, estado, cep, cidade, numero);

  var query = `
  INSERT INTO Empresa (nome_fantasia, razao_social, cnpj, fk_endereço) VALUES
('${nomeFantasia}', '${razaoSocial}', '${cnpj}', now(), '${insertEndereco.insertId}');
  `;

  console.log("Executando a instrução SQL: \n" + query);
  return database.executar(query);
}

async function cadastrarUsuario(nome, email, senha, nomeFantasia, razaoSocial, cnpj) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function cadastrar():", email, senha);

  var insertEmpresa = await cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj, rua, bairro, estado, cep, cidade, numero);

  var instrução = `
  INSERT INTO Usuario (nome, email, senha, tipo_acesso, nivel_acesso, fk_cliente_usuario) VALUES 
  ('${nome}', '${email}', '${senha}', '1', '1', now(),' ${insertEmpresa.insertId}');
  `;

  console.log("Executando a instrução SQL: \n" + instrução);
  return database.executar(instrução);
}


module.exports = {cadastrarUsuario, cadastrarEmpresa, cadastrarEndereco };
