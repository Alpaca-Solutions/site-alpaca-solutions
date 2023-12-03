var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT 
    Empresa.idEmpresa as id,
    Empresa.nomeFantasia as nome,
    Empresa.email,
    Empresa.senha,
    Empresa.cnpj,
    Empresa.ativo,
    Endereco.*
FROM Empresa
JOIN Endereco ON Empresa.fk_endereco = Endereco.idEndereco
WHERE Empresa.email = 'ewerton@gmail.com' AND Empresa.senha = '12345' AND Empresa.ativo = true
UNION
SELECT 
    Usuario.idUsuario as id,
    Usuario.nome,
    Usuario.email,
    Usuario.senha,
    NULL as cnpj,
    Usuario.ativo,
    Endereco.*
FROM Usuario
JOIN Empresa ON Usuario.fkEmpresaUsuario = Empresa.idEmpresa
JOIN Endereco ON Empresa.fk_endereco = Endereco.idEndereco
WHERE Usuario.email = 'ewerton@gmail.com' AND Usuario.senha = '12345' AND Usuario.ativo = true;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarUsuario(nome, email, senha, tipoAcesso, nivelAcesso, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
    VALUES ('${nome}','${email}', '${senha}', '${tipoAcesso}', '${nivelAcesso}', true, 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrarUsuario
};