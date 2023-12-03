CREATE DATABASE IF NOT EXISTS AlpacaDB;
-- DROP DATABASE AlpacaDB;
USE AlpacaDB;

CREATE TABLE Endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(8),
    rua VARCHAR(50),
    numero VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado VARCHAR(50),
    ativo BOOLEAN
);

CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeFantasia VARCHAR(45),
    razaoSocial VARCHAR(45),
    email VARCHAR(50),
    senha VARCHAR(50),
    cnpj VARCHAR(14),
    ativo BOOLEAN,
    fk_endereco INT,
    CONSTRAINT fk_endereco FOREIGN KEY (fk_endereco)
    REFERENCES Endereco(idEndereco)
);

CREATE TABLE Telefone (
    idTelefone INT AUTO_INCREMENT PRIMARY KEY,
    numero CHAR(11),
    tipo VARCHAR(45),
    ativo BOOLEAN,
    fkEmpresa INT,
    CONSTRAINT fkEmpresa_Telefone FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50),
    tipoAcesso VARCHAR(20),
    nivelAcesso VARCHAR(20),
    ativo BOOLEAN,
    fkEmpresa INT,
    CONSTRAINT fkEmpresa_Usuario FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Unidade (
    idUnidade INT AUTO_INCREMENT PRIMARY KEY,
    nomeInstituicao VARCHAR(45),
    ativo BOOLEAN,
    fkEndereco INT,
    CONSTRAINT fkEndereco_Unidade FOREIGN KEY (fkEndereco)
    REFERENCES Endereco(idEndereco)
);

CREATE TABLE Maquina (
    idMaquina INT AUTO_INCREMENT PRIMARY KEY,
    hostname VARCHAR(50) NOT NULL,
    ipMaquina VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    statusMaquina BOOLEAN,
    fkEmpresa INT,
    fKUnidade INT,
    CONSTRAINT fkEmpresa_Maquina FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa(idEmpresa),
    CONSTRAINT fkUnidade_Maquina FOREIGN KEY (fKUnidade)
    REFERENCES Unidade(idUnidade)
);

CREATE TABLE TipoComponente (
    idTipoComponente INT AUTO_INCREMENT PRIMARY KEY,
    nomeTipo VARCHAR(60),
    tipoComponente VARCHAR(60)
);
SELECT idTipoComponente, nomeTipo
FROM TipoComponente
WHERE nomeTipo IN ('Memoria Usada', 'Memoria em Uso', 'Memoria Disponível', 'Percentual de uso do Disco', 'Tamanho do Disco', 'Tamanho Disponível', 'Percentual de Uso do Processador', 'Bytes Recebidos', 'Bytes Enviados')
GROUP BY idTipoComponente, nomeTipo;

SELECT idTipoComponente, nomeTipo, COUNT(*)
FROM TipoComponente
GROUP BY idTipoComponente, nomeTipo
HAVING COUNT(*) > 1;

DELETE t1
FROM TipoComponente t1
INNER JOIN TipoComponente t2
WHERE t1.idTipoComponente > t2.idTipoComponente
AND t1.nomeTipo = t2.nomeTipo;


-- select pra pegar os ids de cada tipo de componente 
SELECT idTipoComponente, nomeTipo
FROM TipoComponente
WHERE (nomeTipo, idTipoComponente) IN (
    SELECT nomeTipo, MIN(idTipoComponente) AS idTipoComponente
    FROM TipoComponente
    WHERE nomeTipo IN ('Memoria Usada', 'Memoria em Uso', 'Memoria Disponível', 'Percentual de uso do Disco', 'Tamanho do Disco', 'Tamanho Disponível', 'Percentual de Uso do Processador', 'Bytes Recebidos', 'Bytes Enviados')
    GROUP BY nomeTipo
);





select * from tipoComponente;

 SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
FROM Medicoes M
JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE TC.nomeTipo = 'bytes recebidos';
CREATE TABLE Config (
    idComponentes INT AUTO_INCREMENT PRIMARY KEY,
    ValorConfiguracao VARCHAR(80),
    fkMaquina INT,
    fkTipoComponenteID INT,
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
    FOREIGN KEY (fkTipoComponenteID) REFERENCES TipoComponente(idTipoComponente)
);

CREATE TABLE UnidadeMedida (
    idParametros INT AUTO_INCREMENT PRIMARY KEY,
    Tipo CHAR(10),
    fkMaquina INT,
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina)
);

INSERT INTO UnidadeMedida(Tipo) VALUES
('GB'),
('MB'),
('KB');

CREATE TABLE Medicoes (
    idMedicoes INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2),
    data_hora_leitura DATETIME,
    id_computador INT,
    fkTipoComponenteID INT,
    fkUnidadeMedidaID INT,
    FOREIGN KEY (fkTipoComponenteID) REFERENCES TipoComponente(idTipoComponente),
    FOREIGN KEY (fkUnidadeMedidaID) REFERENCES UnidadeMedida(idParametros)
);

CREATE TABLE MetricasAlertas (
    idMetricasAlertas INT AUTO_INCREMENT PRIMARY KEY,
    TipoComponente VARCHAR(45),
    maximo VARCHAR(45),
    mensagemAlerta VARCHAR(150),
    minimo VARCHAR(45),
    dhHoraAlerta DATETIME,
    fkUnidadeMedida INT,
    fkTipoComponente INT,
    fkConfiguracao INT,
    FOREIGN KEY (fkUnidadeMedida) REFERENCES UnidadeMedida(idParametros),
    FOREIGN KEY (fkTipoComponente) REFERENCES TipoComponente(idTipoComponente),
    FOREIGN KEY (fkConfiguracao) REFERENCES Config(idComponentes)
);

select * from maquina;

INSERT INTO Endereco (rua, bairro, estado, cep, cidade, numero)
VALUES ('Rua Exemplo', 'Bairro Exemplo', 'Estado Exemplo', '12345678', 'Cidade Exemplo', '123');


INSERT INTO Empresa (nome_fantasia, razao_social, cnpj,email , senha ,  fk_endereco)
VALUES ('Nome Fantasia Exemplo', 'Razão Social Exemplo', '12345678901234','ewerton@gmail.com' , 12345,  1);


select * from unidade;


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

select * from empresa;

update empresa set ativo = true where idempresa = 1;



SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
FROM Medicoes M
JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE TC.nomeTipo = 'Percentual de Uso do Processador';

select * from tipoComponente;



SELECT idTipoComponente, nomeTipo
FROM TipoComponente
WHERE (nomeTipo, idTipoComponente) IN ( 
    SELECT nomeTipo, MIN(idTipoComponente) AS idTipoComponente
    FROM TipoComponente
    WHERE nomeTipo IN ('Memoria Usada', 'Memoria em Uso', 'Memoria Disponível', 'Percentual de uso do Disco', 'Tamanho do Disco', 'Tamanho Disponível', 'Percentual de Uso do Processador', 'Bytes Recebidos', 'Bytes Enviados', 'Percentual de Memoria')
    GROUP BY nomeTipo
);


SELECT 
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
    TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel');
    
    SELECT
    AVG(CASE WHEN TC.nomeTipo = 'Memoria Usada' THEN M.valor END) AS media_memoria_usada,
    AVG(CASE WHEN TC.nomeTipo = 'Memoria Disponivel' THEN M.valor END) AS media_memoria_disponivel
FROM
    Medicoes M
JOIN
    UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN
    TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE
    TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel');



SELECT
    AVG(CASE WHEN TC.nomeTipo = 'Memoria Usada' THEN M.valor END) AS media_memoria_usada,
    AVG(CASE WHEN TC.nomeTipo = 'Memoria Disponivel' THEN M.valor END) AS media_memoria_disponivel
FROM
    Medicoes M
JOIN
    UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN
    TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE
    TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel');


SELECT
    ROUND(AVG(CASE WHEN TC.nomeTipo = 'Memoria Usada' THEN M.valor END), 2) AS media_memoria_usada,
    ROUND(AVG(CASE WHEN TC.nomeTipo = 'Memoria Disponivel' THEN M.valor END), 2) AS media_memoria_disponivel
FROM
    Medicoes M
JOIN
    UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN
    TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE
    TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel');
    
    
    
    
    SELECT
    ROUND(AVG(CASE WHEN TC.nomeTipo = 'Memoria Usada' THEN M.valor END), 2) AS media_memoria_usada,
    ROUND(AVG(CASE WHEN TC.nomeTipo = 'Memoria Disponivel' THEN M.valor END), 2) AS media_memoria_disponivel,
    ROUND(AVG(CASE WHEN TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel') THEN M.valor END), 2) AS media_porcentagem
FROM
    Medicoes M
JOIN
    UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN
    TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE
    TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel');
    
    
    SELECT
    ROUND(AVG(CASE WHEN TC.nomeTipo = 'Memoria Usada' THEN (M.valor / (SELECT MAX(valor) FROM Medicoes WHERE TC.nomeTipo = 'Memoria Disponivel')) * 100 END), 2) AS media_memoria_usada,
    ROUND(AVG(CASE WHEN TC.nomeTipo = 'Memoria Disponivel' THEN (M.valor / (SELECT MAX(valor) FROM Medicoes WHERE TC.nomeTipo = 'Memoria Disponivel')) * 100 END), 2) AS media_memoria_disponivel
FROM
    Medicoes M
JOIN
    TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE
    TC.nomeTipo IN ('Memoria Usada', 'Memoria Disponivel');
    
    SELECT * FROM TipoComponente;
    
  
  select * from config;
  Insert into tipoComponente (nomeTipo , tipoComponente)values
    ('Percentual de Memoria' , 'Memoria');

insert into Config values
(null , 'ConfiguraçãoMediaMemoria' );




    
    
    select * from tipoComponente;
 
 
 
SELECT *
FROM Endereco
JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
WHERE Maquina.ativo = true AND fkEmpresaMaquina = 1;

SELECT *
FROM Endereco
JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
WHERE Maquina.statusMaquina = 1 AND Maquina.fkEmpresa = 1;

  
  select * from maquina;
  
  
  
  SELECT DISTINCT Maquina.idMaquina ,Maquina.hostname
FROM Maquina
JOIN Medicoes ON Medicoes.id_computador = Maquina.idMaquina
JOIN TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
WHERE (TipoComponente.nomeTipo = 'Percentual de Uso do Processador' AND Medicoes.valor > 80)
   OR (TipoComponente.nomeTipo IN ('Memoria Usada', 'Percentual de Memoria') AND Medicoes.valor > 80)
   OR (TipoComponente.nomeTipo IN ('Bytes Recebidos', 'Bytes Enviados') AND Medicoes.valor > 1000);
   
   
SELECT DISTINCT Maquina.idmaquina, Maquina.hostname
FROM Maquina
JOIN Medicoes ON Medicoes.id_computador = Maquina.idMaquina
JOIN TipoComponente ON TipoComponente.idTipoComponente = Medicoes.fkTipoComponenteID
JOIN Empresa ON Empresa.idEmpresa = Maquina.fkEmpresa
WHERE Empresa.idEmpresa = 1
  AND (
    (TipoComponente.nomeTipo = 'Percentual de Uso do Processador' AND Medicoes.valor > 80)
    OR (TipoComponente.nomeTipo IN ('Memoria Usada', 'Percentual de Memoria') AND Medicoes.valor > 80)
    OR (TipoComponente.nomeTipo IN ('Bytes Recebidos', 'Bytes Enviados') AND Medicoes.valor > 1000)
  );
  
SELECT distinct idMaquina, Maquina.hostname
FROM Maquina
JOIN Empresa ON Maquina.fkEmpresa = Empresa.idEmpresa
WHERE Empresa.idEmpresa = 1;

SELECT *
FROM Maquina
WHERE (idMaquina, hostname) IN (
    SELECT idMaquina, hostname
    FROM Maquina
    GROUP BY idMaquina, hostname
    HAVING COUNT(*) > 1
);

DELETE m1
FROM Maquina m1, Maquina m2
WHERE m1.idMaquina > m2.idMaquina
  AND m1.hostname = m2.hostname;



select * from maquina;


insert into maquina values(null , 'maquinaana', '172.168,18.1' ,'Linux' , 1 , 1 , 1);




