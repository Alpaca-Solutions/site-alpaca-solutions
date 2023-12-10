var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listar_usuarios(idEmpresa) {

    
    if(process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT * FROM Usuario WHERE fkEmpresa = ${idEmpresa} AND ativo = 1;
    `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Usuario WHERE fkEmpresa = ${idEmpresa} AND ativo = true;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsuario(idUsuario) {

    if(process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT * FROM Usuario WHERE idUsuario = ${idUsuario};
        `;
    
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Usuario WHERE idUsuario = ${idUsuario};
        `;        
    }
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarUsuario(idUsuario) {

    if(process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario SET ativo = 0 WHERE idUsuario =  ${idUsuario};
        `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        UPDATE Usuario SET ativo = false WHERE idUsuario =  ${idUsuario};
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarUsuario(idUsuario, dadosAtualizados) {
    
    
    if(process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario
        SET nome = '${dadosAtualizados.nome}',
            email = '${dadosAtualizados.email}',
            tipoAcesso = '${dadosAtualizados.tipoAcesso}',
            nivelAcesso = '${dadosAtualizados.nivelAcesso}'
        WHERE idUsuario = ${idUsuario};
      `;
    }

    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        UPDATE Usuario
        SET nome = '${dadosAtualizados.nome}',
            email = '${dadosAtualizados.email}',
            tipoAcesso = '${dadosAtualizados.tipoAcesso}',
            nivelAcesso = '${dadosAtualizados.nivelAcesso}'
        WHERE idUsuario = ${idUsuario};
      `; 
    }


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_Maquinas(fkEmpresa) {

    if(process.env.AMBIENTE_PROCESSO == "producao") {   
        var instrucao = `
        SELECT *
    FROM Endereco
    JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
    JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
    WHERE Maquina.statusMaquina = 1 AND fkEmpresa = ${fkEmpresa};
        `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT *
    FROM Endereco
    JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
    JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
    WHERE Maquina.statusMaquina = 1 AND fkEmpresa = ${fkEmpresa};
        `;
    }
 

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_MaquinasLista(fkEmpresa) {

    if(process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT MAX(idMaquina) AS idMaquina, TRIM(hostname) AS hostname
    FROM Maquina
    WHERE fkempresa = ${fkEmpresa}
    GROUP BY TRIM(hostname);
    `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT MAX(idMaquina) AS idMaquina, TRIM(hostname) AS hostname
        FROM Maquina
        WHERE fkempresa = ${fkEmpresa}
        GROUP BY TRIM(hostname);
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquina(idMaquina) {
  if(process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT *
FROM Endereco
JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
WHERE Maquina.statusMaquina = 1 AND idMaquina = ${idMaquina};
    `;
  }
   else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    SELECT *
FROM Endereco
JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
WHERE Maquina.statusMaquina = true AND idMaquina = ${idMaquina};
    `;   
}

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function deletarMaquina(idMaquina) {

    if(process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Maquina SET statusMaquina = 0 WHERE idMaquina = ${idMaquina};
        `;
    }
    else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        UPDATE Maquina SET statusMaquina = false WHERE idMaquina = ${idMaquina};
        `;
    }
 

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarMaquina(idMaquina, dadosAtualizados) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao1 = `UPDATE Maquina
                      SET hostname = '${dadosAtualizados.NomeMaquina}',
                          sistemaOperacional = '${dadosAtualizados.sistemaOperacional}'
                      WHERE idMaquina = ${idMaquina}`;

    var instrucao2 = `UPDATE Unidade
                      SET nomeInstituicao = '${dadosAtualizados.nomeInstituicao}'
                      WHERE idUnidade = ${dadosAtualizados.fkUnidade}`;

    var instrucao3 = `UPDATE Endereco
                      SET cep = '${dadosAtualizados.cep}',
                          rua = '${dadosAtualizados.rua}',
                          numero = '${dadosAtualizados.numero}',
                          bairro = '${dadosAtualizados.bairro}',
                          cidade = '${dadosAtualizados.cidade}',
                          estado = '${dadosAtualizados.estado}'
                      WHERE idEndereco = ${dadosAtualizados.fkEndereco}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao1 = `UPDATE Maquina
        SET hostname = '${dadosAtualizados.NomeMaquina}',
            sistemaOperacional = '${dadosAtualizados.sistemaOperacional}'
        WHERE idMaquina = ${idMaquina}`;

var instrucao2 = `UPDATE Unidade
        SET nomeInstituicao = '${dadosAtualizados.nomeInstituicao}'
        WHERE idUnidade = ${dadosAtualizados.fkUnidade}`;

var instrucao3 = `UPDATE Endereco
        SET cep = '${dadosAtualizados.cep}',
            rua = '${dadosAtualizados.rua}',
            numero = '${dadosAtualizados.numero}',
            bairro = '${dadosAtualizados.bairro}',
            cidade = '${dadosAtualizados.cidade}',
            estado = '${dadosAtualizados.estado}'
        WHERE idEndereco = ${dadosAtualizados.fkEndereco}`;

    }
    console.log("Executando a instrução SQL 1: \n" + instrucao1);
    console.log("Executando a instrução SQL 2: \n" + instrucao2);
    console.log("Executando a instrução SQL 3: \n" + instrucao3);

    return Promise.all([
        database.executar(instrucao1),
        database.executar(instrucao2),
        database.executar(instrucao3)
    ]);
    
}
function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    var instrucao = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    listar_usuarios,
    listarUsuario,
    deletarUsuario,
    atualizarUsuario,
    listarMaquina,
    deletarMaquina,
    atualizarMaquina, 
    listar_Maquinas,
    listar_MaquinasLista
}
