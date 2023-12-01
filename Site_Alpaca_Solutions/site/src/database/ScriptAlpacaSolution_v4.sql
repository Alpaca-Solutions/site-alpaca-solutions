CREATE DATABASE AlpacaDB;
USE AlpacaDB;
-- drop database AlpacaDB;

CREATE TABLE Endereco(
idEndereco int primary key auto_increment,
cep varchar(8),
rua varchar(50),
numero varchar(50),
bairro varchar(50),
cidade varchar(50),
estado varchar(50),
ativo boolean
);

CREATE TABLE Empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
razaoSocial varchar(45),
cnpj varchar(14),
ativo boolean,
fk_endereco int,
constraint fk_endereco foreign key (fk_endereco)
references Endereco(idEndereco)
);

CREATE TABLE Telefone(
idTelefone int primary key auto_increment,
numero char(11),
tipo varchar(45),
ativo boolean,
fkEmpresa int,
constraint fkEmpresa foreign key (fkEmpresa)
references Empresa(idEmpresa)
);

CREATE TABLE Usuario(
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(50),
senha varchar(50),
tipoAcesso varchar(20),
nivelAcesso varchar(20),
ativo boolean,
fkEmpresaUsuario int,
constraint fkEmpresaUsuario foreign key (fkEmpresaUsuario)
references Empresa(idEmpresa)
);

CREATE TABLE Unidade(
idUnidade int primary key auto_increment,
nomeInstituicao varchar(45),
ativo boolean,
fkEndereco int,
constraint fkEndereco foreign key (fkEndereco) references Endereco(idEndereco)
);

CREATE TABLE Maquina(
idMaquina int primary key auto_increment,
NomeMaquina varchar(50) not null,
ipMaquina varchar(45),
sistemaOperacional varchar(45),
statusMaquina boolean,
ativo boolean,
fkEmpresaMaquina int,
fKUnidade int,
constraint fkEmpresaMaquina foreign key (fkEmpresaMaquina)
references Empresa(idEmpresa),
constraint fkUnidade foreign key (fKUnidade)
references Unidade(idUnidade)
);

CREATE TABLE TipoComponente (
  idTipoComponente INT PRIMARY KEY auto_increment,
  Cpu_ VARCHAR(20),
  DiscoRigido VARCHAR(45),
  Memoria VARCHAR(45),
  Rede VARCHAR(45)
);

CREATE TABLE Config (
  idComponentes INT PRIMARY KEY auto_increment,
  ValorConfiguracao VARCHAR(45),
  fkMaquina INT,
  fkTipoComponenteID INT,
  FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
  FOREIGN KEY (fkTipoComponenteID) REFERENCES TipoComponente(idTipoComponente)
);

CREATE TABLE UnidadeMedida (
  idParametros INT PRIMARY KEY auto_increment,
  Tipo VARCHAR(45),
  Valor VARCHAR(45),
  fkMaquina INT,
  FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina)
);

CREATE TABLE Medicoes (
  idMedicoes INT PRIMARY KEY auto_increment,
  valor DECIMAL(10,2),
  data_hora_leitura DATETIME,
  id_computador INT,
  fkTipoComponenteID INT,
  fkUnidadeMedidaID INT,
  FOREIGN KEY (fkTipoComponenteID) REFERENCES TipoComponente(idTipoComponente),
  FOREIGN KEY (fkUnidadeMedidaID) REFERENCES UnidadeMedida(idParametros)
);

CREATE TABLE MetricasAlertas (
  idMetricasAlertas INT PRIMARY KEY auto_increment,
  TipoComponente VARCHAR(45),
  maximo VARCHAR(45),
  mensagemAlerta VARCHAR(45),
  minimo VARCHAR(45),
  dhHoraAlerta DATETIME,
  fkUnidadeMedida INT,
  fkTipoComponente INT,
  fkConfiguracao INT,
  FOREIGN KEY (fkUnidadeMedida) REFERENCES UnidadeMedida(idParametros),
  FOREIGN KEY (fkTipoComponente) REFERENCES TipoComponente(idTipoComponente),
  FOREIGN KEY (fkConfiguracao) REFERENCES Config(idComponentes)
);

-- inserts:
-- CADASTRANDO EMPRESA:

INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
VALUES ('01414001', 'Rua Haddock Lobo', '595', 'Cerqueira César', 'São Paulo', 'SP', true);

INSERT INTO Empresa (nomefantasia, razaoSocial, cnpj, ativo, fk_endereco)
VALUES ('São Paulo Tech School', 'SPTech School', '40186572000121', true, 1);

INSERT INTO Telefone (numero, tipo, ativo, fkEmpresa)
VALUES ('11940634991', 'Fixo', true, 1);
      
INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('SPTech School','sptech.matriz@sptech.school', '123123', '1', '1', true, 1);

-- CADASTRANDO MAQUINA 
INSERT INTO Endereco (cep, rua, numero, bairro,  cidade, estado, ativo)
VALUES ('01414001', 'Rua Haddock Lobo', '595', 'Cerqueira César', 'São Paulo', 'SP', true);

INSERT INTO Unidade (nomeInstituicao, ativo, fkEndereco)
VALUES('SPtech Paulista', true, 1); 

INSERT INTO Maquina(NomeMaquina, ipMaquina, sistemaOperacional, statusMaquina, ativo, fkEmpresaMaquina, fkUnidade)
VALUES('Unidade Paulista', '55.554.778-77', 'Linux', true, true, 1, 1);
      
-- CADASTRANDO USUARIOS 
INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('Gabrielli Gallione','gabrielli.fogaca@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('Sophia Amaral','sophia.silva@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('Anna Matos','anna.matos@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('Ewerton Lima','ewerton.lima860@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('João Victor','joao.silva850@sptech.school', '123123', 1, 1, true, 1);

INSERT INTO Usuario (nome, email, senha, tipoAcesso, nivelAcesso, ativo, fkEmpresaUsuario)
VALUES ('Erick Roberto','erick.ribeiro@sptech.school', '123123', 1, 1, true, 1);

-- selects: 

SELECT * FROM Endereco
      JOIN Empresa ON Empresa.fk_endereco = Endereco.idEndereco
      JOIN Telefone ON Telefone.fkEmpresa = Empresa.idEmpresa
      JOIN Usuario ON Usuario.fkEmpresaUsuario = Empresa.idEmpresa 
      WHERE Usuario.ativo = true AND idEmpresa = 1;

SELECT * FROM Endereco
JOIN Empresa ON Empresa.fk_endereco = Endereco.idEndereco
JOIN Telefone ON Telefone.fkEmpresa = Empresa.idEmpresa
JOIN Usuario ON Usuario.fkEmpresaUsuario = Empresa.idEmpresa
WHERE email = 'sptech.matriz@gmail' AND senha = '123123'  AND Usuario.ativo = true;

SELECT *
FROM Endereco
JOIN Unidade ON Unidade.fkEndereco = Endereco.idEndereco
JOIN Maquina ON Maquina.fKUnidade = Unidade.idUnidade 
WHERE Maquina.ativo = true AND idMaquina = 1;

-- CRUD

-- UPDAT
-- Atualização da tabela Endereco
UPDATE Endereco
SET cep = '01414001',
    rua = 'Rua Haddock Lobo',
    numero = '595',
    bairro = 'Cerqueira César',
    cidade = 'São Paulo',
    estado = 'SP',
    ativo = true
WHERE id_endereco = 1;

-- Atualização da tabela Empresa
UPDATE Empresa SET nomefantasia = 'São Paulo Tech School',
    razaoSocial = 'SPTech School',
    cnpj = '40186572000121',
    ativo = true,
    fk_endereco = 1
WHERE id_empresa = 1;

-- Atualização da tabela Telefone
UPDATE Telefone SET numero = '11940634991',
    tipo = 'Fixo',
    ativo = true,
    fkEmpresa = 1
WHERE id_telefone = 1;

-- Atualização da tabela Usuario
UPDATE Usuario SET nome = 'SPTech School',
    email = 'sptech.matriz@sptech.school',
    senha = '123123',
    tipoAcesso = '1',
    nivelAcesso = '1',
    ativo = true,
    fkEmpresaUsuario = 1
WHERE id_usuario = 1; 

-- UPDAE MAQUINA

-- Atualização da tabela Endereco
UPDATE Endereco
SET cep = '01414001',
    rua = 'Rua Haddock Lobo',
    numero = '595',
    bairro = 'Cerqueira César',
    cidade = 'São Paulo',
    estado = 'SP',
    ativo = false
WHERE idEndereco = 1;

-- Atualização da tabela Unidade
UPDATE Unidade
SET nomeInstituicao = 'SPtech Paulista',
    ativo = false,
    fkEndereco = 1
WHERE idUnidade = 1;

-- Atualização da tabela Maquina
UPDATE Maquina
SET NomeMaquina = 'Unidade Paulista',
    ipMaquina = '55.554.778-77',
    sistemaOperacional = 'Linux',
    statusMaquina = true,
    ativo = false,
    fkEmpresaMaquina = 1,
    fkUnidade = 1
WHERE idMaquina = 1;

-- DELETE 
-- DELETE DA tabela Endereco
UPDATE Endereco SET ativo = false WHERE idEndereco = 1;

-- DELETE DA tabela Empresa
UPDATE Empresa SET ativo = false WHERE idEmpresa = 1;

-- DELETE DA tabela Telefone
UPDATE Telefone SET ativo = false WHERE idTelefone = 1;

-- DELETE DA tabela Usuario
UPDATE Usuario SET ativo = false WHERE idUsuario = 1;

-- DELETE DA tabela Maquina
UPDATE Maquina SET ativo = false WHERE fkEmpresaMaquina = 1;

-- OUTROS UPDATES
-- DELETE DA tabela Unidade
UPDATE Unidade SET ativo = false WHERE idUnidade = 1;
