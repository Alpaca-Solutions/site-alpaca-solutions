var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
   
    if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT 
    'empresa' as tipo,
    Empresa.idEmpresa as id,
    Empresa.nomeFantasia as nome,
    Empresa.email,
    Empresa.senha,
    Empresa.cnpj,
    Empresa.ativo,
    Endereco.*
FROM Empresa
JOIN Endereco ON Empresa.fk_endereco = Endereco.idEndereco
WHERE Empresa.email = '${email}' AND Empresa.senha = '${senha}' AND Empresa.ativo = 1
UNION
SELECT 
'empregado' as tipo,
    Usuario.idUsuario as id,
    Usuario.nome,
    Usuario.email,
    Usuario.senha,
    NULL as cnpj,
    Usuario.ativo,
    Endereco.*
FROM Usuario
JOIN Empresa ON Usuario.fkEmpresa = Empresa.idEmpresa
JOIN Endereco ON Empresa.fk_endereco = Endereco.idEndereco
WHERE Usuario.email = '${email}' AND Usuario.senha = '${senha}' AND Usuario.ativo = 1;
    `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `    SELECT 
        'empresa' as tipo,
        Empresa.idEmpresa as id,
        Empresa.nomeFantasia as nome,
        Empresa.email,
        Empresa.senha,
        Empresa.cnpj,
        Empresa.ativo,
        Endereco.*
    FROM Empresa
    JOIN Endereco ON Empresa.fk_endereco = Endereco.idEndereco
    WHERE Empresa.email = '${email}' AND Empresa.senha = '${senha}' AND Empresa.ativo = true
    UNION
    SELECT 
    'empregado' as tipo,
        Usuario.idUsuario as id,
        Usuario.nome,
        Usuario.email,
        Usuario.senha,
        NULL as cnpj,
        Usuario.ativo,
        Endereco.*
    FROM Usuario
    JOIN Empresa ON Usuario.fkEmpresa = Empresa.idEmpresa
    JOIN Endereco ON Empresa.fk_endereco = Endereco.idEndereco
    WHERE Usuario.email = '${email}' AND Usuario.senha = '${senha}' AND Usuario.ativo = true;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarUsuario(nome, email, senha, tipoAcesso, nivelAcesso, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
    VALUES ('${nome}','${email}', '${senha}', '${tipoAcesso}', '${nivelAcesso}', true, ${empresaId});
    `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        var instrucao = `
        INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
        VALUES ('${nome}','${email}', '${senha}', '${tipoAcesso}', '${nivelAcesso}', true, 1);
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrarUsuario
};