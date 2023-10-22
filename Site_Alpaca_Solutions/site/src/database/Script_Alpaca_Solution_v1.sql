create database AlpacaDB;
USE AlpacaDB;

create table Endereco(
idEndereco int primary key auto_increment,
rua varchar(50) not null,
bairro varchar(50) not null,
estado varchar(20) not null,
cep char(8),
cidade varchar(50) not null,
numero varchar(50) not null
);

INSERT INTO Endereco (rua, bairro, estado, cep, cidade, complemento) VALUES
('${rua}','${bairro}','${','${cep}','${cidade}','${numero}');

select * from Empresa;
select * FROM Usuario;
select * from Endereco;

create table Empresa(
idEmpresa int primary key auto_increment,
nome_fantasia varchar(45),
razao_social varchar(45),
cnpj varchar(14) unique not null,
fk_endereco int,
constraint fk_endereco foreign key (fk_endereco)
references Endereco(idEndereco)
);

INSERT INTO Empresa (nome_fantasia, razao_social,email_cliente, senha_cliente, cnpj) VALUES
("Teste", "Testinho","anna@gmail", "123123","12345678912345");

SELECT idEmpresa, email_cliente, senha_cliente FROM Empresa WHERE email_cliente = '${email}' AND senha_cliente = '${senha}';

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
email varchar(50) unique not null,
senha varchar(50) not null,
tipo_acesso char(1) not null,
nivel_acesso char(1) not null,
fk_cliente_usuario int,
constraint fk_cliente_usuario foreign key (fk_cliente_usuario)
references Empresa(idEmpresa)
);
 INSERT INTO Usuario (nome, email, senha, nivel_de_acesso, Fk_cliente_Usuario) VALUES ('teste', '${email}', '${senha}','1234567891', '1');



create table Endereco_Maquina(
idEndereco_maquina int primary key auto_increment,
andar int,
predio varchar(45)
);

create table Maquina(
idMaquina int primary key auto_increment,
lote_maquina int not null,
nome_maquina varchar(50) not null,
ip_servidor int not null,
sistema_operacional varchar(15),
status_servidor varchar(45),
fk_empresa int,
fK_endereco_maquina int,
constraint fk_empresa foreign key (fk_empresa)
references Empresa(idEmpresa),
constraint fk_endereco_maquina foreign key (fK_endereco_maquina)
references Endereco_Maquina(idEndereco_Maquina)
);

create table Dados_Servidor(
idDados_servidor int primary key auto_increment,
porcentagem_de_uso_disco decimal(10,2),
porcentagem_de_uso_memoria varchar(45),
quantidade_total_ram decimal(10,2),
quantidade_disponivel_ram varchar(45),
bytes_recebidos decimal(10,2),
bytes_enviados decimal(10,2),
tamanho_total_disco decimal(10,2),
porcentagem_uso_cpu decimal(10,2),
tamanho_disponivel_disco varchar(45),
memoria_total decimal(10,2),
dt_hora datetime,
fk_maquina int,
constraint fk_Maquina foreign key (fk_Maquina)
references Maquina(idMaquina)
);

create table Parametros(
idParametros int primary key auto_increment,
aviso_disco decimal(10,2),
aviso_ram decimal(10,2),
aviso_cpu decimal(10,2),
fk_servidor int,
fk_maquina_parametros int,
constraint fk_servidor foreign key (fk_servidor)
references Dados_Servidor(idDados_Servidor),
constraint fk_maquina_parametros foreign key (Fk_maquina_parametros)
references Maquina(idMaquina)
); 