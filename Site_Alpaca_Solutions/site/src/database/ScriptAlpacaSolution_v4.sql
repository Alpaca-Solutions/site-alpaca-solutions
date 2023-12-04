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


CREATE TABLE Medicoes (
    idMedicoes INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2),
    data_hora_leitura DATETIME,
    id_computador INT,
    fkTipoComponenteID INT,
    fkUnidadeMedidaID INT,
    FOREIGN KEY (fkTipoComponenteID) REFERENCES TipoComponente(idTipoComponente),
    foreign key(id_computador) references maquina(idmaquina),
    FOREIGN KEY (fkUnidadeMedidaID) REFERENCES UnidadeMedida(idParametros)
);

select * from tipoComponente;

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

-- INSERTS:

INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
VALUES ('01414001', 'Rua Haddock Lobo', '595', 'Cerqueira César', 'São Paulo', 'SP', true);

INSERT INTO Empresa (nomefantasia, razaoSocial, cnpj, ativo, fk_endereco)
VALUES ('São Paulo Tech School', 'SPTech School', '40186572000121', true, 1);

INSERT INTO Telefone (numero, tipo, ativo, fkEmpresa)
VALUES ('11940634991', 'Fixo', true, 1);
      
INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('SPTech School','sptech.matriz@sptech.school', '123123', '1', '1', true, 1);

-- Cadastra usuario:

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('Gabrielli Gallione','gabrielli.fogaca@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('Sophia Amaral','sophia.silva@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('Anna Matos','anna.matos@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('Ewerton Lima','ewerton.lima860@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('João Victor','joao.silva850@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresa)
VALUES ('Erick Roberto','erick.ribeiro@sptech.school', '123123', 1, 1, true, 1);

-- CADASTRANDO MAQUINA 
INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
VALUES ('01414001', 'Rua Haddock Lobo', '595', 'Cerqueira César', 'São Paulo', 'SP', true);

INSERT INTO Unidade (nomeInstituicao, ativo, fkEndereco)
VALUES('SPtech Paulista', true, 1); 

INSERT INTO Maquina(hostname, ipMaquina, sistemaOperacional, statusMaquina, fkEmpresa, fkUnidade)
VALUES('Unidade Paulista', '55.554.778-77', 'Linux', true,  1, 1);


-- Java Funcionar:
UPDATE Empresa SET email = "ewerton@gmail.com",
senha = "12345"
WHERE idEmpresa = 1;

INSERT INTO UnidadeMedida(Tipo) VALUES
('GB'),
('MB'),
('KB');

INSERT INTO TipoComponente (nomeTipo, tipoComponente)
VALUES
('Memoria Usada', 'Memoria'),
('Memoria em Uso', 'Memoria'),
('Memoria Disponível', 'Memoria'),
('Percentual de Uso do Disco', 'Disco'),
('Tamanho do Disco', 'Disco'),
('Tamanho Disponível', 'Disco'),
('Percentual de Uso do Processador', 'Processador'),
('Bytes Recebidos', 'Rede'),
('Bytes Enviados','Rede');

Insert into tipoComponente (nomeTipo , tipoComponente)values
    ('Percentual de Memoria', 'Memoria');

INSERT INTO Config (ValorConfiguracao)
VALUES
('ConfiguracaoMemoriaUsada'),
('ConfiguracaoMemoriaEmUso'),
('ConfiguracaoMemoriaDisponivel'),
('ConfiguracaoPercentualUsoDisco'),
('ConfiguracaoTamanhoDisco'),
('ConfiguracaoTamanhoDisponivel'),
('ConfiguracaoPercentualUsoProcessador'),
('ConfiguracaoBytesRecebidos'),
('ConfiguracaoBytesEnviados');
 
 
 
SELECT M.*, U.Tipo AS TipoUnidadeMedida, TC.nomeTipo AS NomeTipoComponente
FROM Medicoes M
JOIN UnidadeMedida U ON M.fkUnidadeMedidaID = U.idParametros
JOIN TipoComponente TC ON M.fkTipoComponenteID = TC.idTipoComponente
WHERE TC.nomeTipo = 'Percentual de Memoria';

SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros 
where tipoComponente = "Disco" AND nomeTipo = 'Tamanho Disponível' or nomeTipo ='Tamanho do Disco';

SELECT *
FROM Medicoes AS m
JOIN TipoComponente AS tc ON m.fkTipoComponenteID = tc.idTipoComponente
JOIN UnidadeMedida AS um ON m.fkUnidadeMedidaID = um.idParametros
JOIN Maquina AS maq ON um.fkMaquina = maq.idMaquina
WHERE tc.nome = 'Disco' AND (tc.nome = 'Tamanho Disponível' OR tc.nome = 'Tamanho do Disco')
LIMIT 0, 1000;