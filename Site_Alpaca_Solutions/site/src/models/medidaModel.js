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

function buscarRede(){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select byte_recebido, byte_enviado from rede;`;

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
        instrucaoSql = `select byte_recebido, byte_enviado from rede;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
        FROM Medicoes M
        JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
        JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
        WHERE TC.nomeTipo = 'Percentual de Memoria';`;
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


function buscarDisco(){
    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select byte_recebido, byte_enviado from rede;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
        FROM Medicoes M
        JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
        JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
        WHERE TC.nomeTipo = 'Percentual de Uso do Disco';`;
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
        instrucaoSql = `select byte_recebido, byte_enviado from rede;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
        FROM Medicoes M
        JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
        JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
        WHERE TC.nomeTipo = 'Percentual de Uso do Processador';`;
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
    buscarCPU
}
