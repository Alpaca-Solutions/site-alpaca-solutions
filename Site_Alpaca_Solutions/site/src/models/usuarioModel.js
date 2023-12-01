var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT *
    FROM Endereco
    JOIN Empresa ON Empresa.fk_endereco = Endereco.idEndereco
    JOIN Telefone ON Telefone.fkEmpresa = Empresa.idEmpresa
    JOIN Usuario ON Usuario.fkEmpresaUsuario = Empresa.idEmpresa
    WHERE email = '${email}' AND senha = '${senha}' AND Usuario.ativo = true;
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