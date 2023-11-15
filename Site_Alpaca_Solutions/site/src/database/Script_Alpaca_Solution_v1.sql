create database AlpacaDB;
use AlpacaDB;

SELECT * FROM Endereco
JOIN Empresa ON Empresa.fk_endereco = Endereco.idEndereco
JOIN Telefone ON Telefone.fk_cliente = Empresa.idEmpresa
JOIN Usuario ON Usuario.fk_cliente_usuario = Empresa.idEmpresa;

create table Endereco(
idEndereco int primary key auto_increment,
rua varchar(50),
bairro varchar(50),
estado varchar(20),
cep varchar(8),
cidade varchar(50),
numero varchar(50)
);

create table Empresa(
idEmpresa int primary key auto_increment,
nome_fantasia varchar(45),
razao_social varchar(45),
cnpj varchar(14),
fk_endereco int,
constraint fk_endereco foreign key (fk_endereco)
references Endereco(idEndereco)
);

create table Telefone(
idTelefone int primary key auto_increment,
numero char(11),
tipo varchar(45),
fk_cliente int,
constraint fk_cliente foreign key (fk_cliente)
references Empresa(idEmpresa)
);


Create table Usuario(
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(50),
senha varchar(50),
tipo_acesso varchar(20),
nivel_acesso varchar(20),
fk_cliente_usuario int,
constraint fk_cliente_usuario foreign key (fk_cliente_usuario)
references Empresa(idEmpresa)
);

create table Unidade(
idUnidade int primary key auto_increment,
nomeUnidade varchar(45),
fkEndereco int,
constraint fkEndereco foreign key (fkEndereco) references Endereco(idEndereco)
);

create table Maquina(
idMaquina int primary key auto_increment,
NomeServidor varchar(50) not null,
ipServidor varchar(45),
sistemaOperacional varchar(45),
tipoInstancia varchar(45),
statusServidor varchar(45),
fk_empresa int,
fKUnidade int,
constraint fk_empresa foreign key (fk_empresa)
references Empresa(idEmpresa),
constraint fkUnidade foreign key (fKUnidade)
references Unidade(idUnidade)
);
