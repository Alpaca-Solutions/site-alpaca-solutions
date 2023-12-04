var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
        FROM Medicoes M
        JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
        JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
        WHERE TC.nomeTipo = 'bytes recebidos';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRede(){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        M.*, 
        U.Tipo AS TipoUnidadeMedida, 
        TC.nomeTipo AS NomeTipoComponente
        FROM 
        Medicoes M
        JOIN 
        UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
        JOIN 
        TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
        WHERE 
        TC.nomeTipo IN ('bytes recebidos', 'bytes enviados');`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT 
        M.*, 
        U.Tipo AS TipoUnidadeMedida, 
        TC.nomeTipo AS NomeTipoComponente
        FROM 
        Medicoes M
        JOIN 
        UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
        JOIN 
        TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
        WHERE 
        TC.nomeTipo IN ('bytes recebidos', 'bytes enviados');`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}

function buscarMemoria(){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  SELECT *
        FROM Medicoes AS m
        JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
        JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
        where  tipoComponente = 'Memoria' AND nomeTipo ='Percentual de Memoria';`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
where  tipoComponente = "Memoria" AND nomeTipo ='Percentual de Memoria';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}
function buscarDisco(){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `     SELECT *
        FROM Medicoes AS m
        JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
        JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros 
        where tipoComponente = 'Disco' AND nomeTipo = 'Percentual de Uso do Disco';`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros 
where tipoComponente = "Disco" AND nomeTipo = 'Percentual de Uso do Disco';
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}

function buscarCPU(){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `    SELECT *
        FROM Medicoes AS m
        JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
        JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
        where  tipoComponente = 'Processador';;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
where  tipoComponente = "Processador";
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}




function buscarRedeId(id){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT 
        M.*, 
        U.Tipo AS TipoUnidadeMedida, 
        TC.nomeTipo AS NomeTipoComponente
    FROM 
        Medicoes M
    JOIN 
        UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
    JOIN 
        TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
    WHERE id_computador = '1' AND  
        TC.nomeTipo IN ('bytes recebidos', 'bytes enviados');`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT 
        M.*, 
        U.Tipo AS TipoUnidadeMedida, 
        TC.nomeTipo AS NomeTipoComponente
    FROM 
        Medicoes M
    JOIN 
        UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
    JOIN 
        TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
    WHERE id_computador = '1' AND  
        TC.nomeTipo IN ('bytes recebidos', 'bytes enviados');`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}

function buscarMemoriaId(id){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `    SELECT *
        FROM Medicoes AS m
        JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
        JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
        where id_computador = '1' AND  tipoComponente = 'Memoria' AND nomeTipo ='Percentual de Memoria';`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
where id_computador = '1' AND  tipoComponente = "Memoria" AND nomeTipo ='Percentual de Memoria';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}
function buscarDiscoId(id){
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  SELECT *
        FROM Medicoes AS m
        JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
        JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros 
        where id_computador = '1' AND  tipoComponente = 'Disco' AND nomeTipo = 'Percentual de Uso do Disco';`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros 
where id_computador = '1' AND  tipoComponente = "Disco" AND nomeTipo = 'Percentual de Uso do Disco';
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}


function buscarQtdMaquinaAlerta(){
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT 
        COUNT(DISTINCT Maquina.idMaquina) AS TotalMaquinasEmAlerta
    FROM 
        Maquina
    JOIN 
        Medicoes ON Medicoes.id_computador = Maquina.idMaquina
    JOIN 
        TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
    WHERE 
        TipoComponente.nomeTipo = 'Percentual de Memoria' 
        AND Medicoes.valor > 80;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        COUNT(DISTINCT Maquina.idMaquina) AS TotalMaquinasEmAlerta
    FROM 
        Maquina
    JOIN 
        Medicoes ON Medicoes.id_computador = Maquina.idMaquina
    JOIN 
        TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
    WHERE 
        TipoComponente.nomeTipo = 'Percentual de Memoria' 
        AND Medicoes.valor > 80;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}


function buscarCPUId(id){
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `   SELECT *
        FROM Medicoes AS m
        JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
        JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
        where id_computador = '1' AND   tipoComponente = 'Processador';`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
where id_computador = '1' AND   tipoComponente = "Processador";
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}



function buscarQtdProcessadorAlerta(){
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        COUNT(DISTINCT Maquina.idMaquina) AS TotalProcessadorEmAlerta
    FROM 
        Maquina
    JOIN 
        Medicoes ON Medicoes.id_computador = Maquina.idMaquina
    JOIN 
        TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
    WHERE 
        TipoComponente.nomeTipo = 'Percentual de Processador' 
        AND Medicoes.valor > 80;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        COUNT(DISTINCT Maquina.idMaquina) AS TotalProcessadorEmAlerta
    FROM 
        Maquina
    JOIN 
        Medicoes ON Medicoes.id_computador = Maquina.idMaquina
    JOIN 
        TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
    WHERE 
        TipoComponente.nomeTipo = 'Percentual de Processador' 
        AND Medicoes.valor > 80;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}


function MaquinasAlerta(){
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        COUNT(DISTINCT Maquina.idMaquina) AS TotalProcessadorEmAlerta
    FROM 
        Maquina
    JOIN 
        Medicoes ON Medicoes.id_computador = Maquina.idMaquina
    JOIN 
        TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
    WHERE 
        TipoComponente.nomeTipo = 'Percentual de Processador' 
        AND Medicoes.valor > 80;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT DISTINCT Maquina.idMaquina, Maquina.hostname
    FROM Maquina
   JOIN Empresa ON Maquina.fkEmpresa = Empresa.idEmpresa
  WHERE Empresa.idEmpresa = 1
  AND EXISTS (
    SELECT 1
    FROM Medicoes
    WHERE Medicoes.id_computador = Maquina.idMaquina
   );
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}



function buscarMaquinasUsuario(idNovo){
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT DISTINCT Maquina.idMaquina, Maquina.hostname
        FROM Maquina
        JOIN Empresa ON Maquina.fkEmpresa = Empresa.idEmpresa
        WHERE Empresa.idEmpresa = 1
        AND EXISTS (
            SELECT 1
            FROM Medicoes
            WHERE Medicoes.id_computador = Maquina.idMaquina
        );
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT DISTINCT Maquina.idMaquina, Maquina.hostname
        FROM Maquina
        JOIN Empresa ON Maquina.fkEmpresa = Empresa.idEmpresa
        WHERE Empresa.idEmpresa = ${idNovo}
        AND EXISTS (
            SELECT 1
            FROM Medicoes
            WHERE Medicoes.id_computador = Maquina.idMaquina
        );
        
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarRede,
    buscarMemoria,
    buscarDisco,
    buscarCPU,
    buscarRedeId,
    buscarMemoriaId,
    buscarDiscoId,
    buscarCPUId,
    buscarQtdMaquinaAlerta,
    buscarQtdProcessadorAlerta,
    MaquinasAlerta,
    buscarMaquinasUsuario
}
