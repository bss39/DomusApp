drop database if exists domus;
create database if not exists domus;

use domus;

drop table if exists Accion;
drop table if exists Elemento;
drop table if exists Usuario;

create table Usuario (
	id int not null auto_increment primary key,
    nombre varchar(255) not null,
    pin int(4) not null,
    administrador boolean default false not null
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

create table Elemento (
	id int not null auto_increment primary key,
    nombre varchar(255) not null,
    estado varchar(255) not null,
    descripcion varchar(255) not null,
    icono varchar(255) not null
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

create table Accion (
	id int not null auto_increment primary key,
    descripcion varchar(255) not null,
    fecha date not null,
    hora time not null,
    usuario_id int not null,
    elemento_id int not null,
    constraint accion_usuario_fk foreign key (usuario_id) references Usuario(id),
    constraint accion_elemento_fk foreign key (elemento_id) references Elemento(id)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

