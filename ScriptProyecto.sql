
create database blog_ambiental character set utf8mb4 ; 

-- selecciona base de datos
use blog_ambiental;
----------------------------------------------------------------------------------------------
---- creacion de la tabla tipo_articulo 

create table tipo(
    id bigint unsigned auto_increment primary key,
	nombre	varchar(255)		not null
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla usuario 

create table usuario (
    id bigint unsigned auto_increment primary key,
	nombre		varchar(255)		not null,
	email		varchar(255)		not null,
	contraseña		varchar(255)		not null
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla tematica 

create table tematica (
    id bigint unsigned auto_increment primary key,
	nombre_tematica	varchar(150)		not null
);

----------------------------------------------------------------------------------------------
---- creacion de la tabla articulo 

create table articulo (
    id bigint unsigned auto_increment primary key,
	titulo			varchar(255)		not null,
	fecha			date				not null,
	is_aprobado		BIT(1)				not null,
	id_usuario		bigint 	unsigned	not null,
	foreign key (id_usuario) references usuario(id)
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla imagen 

create table imagen (
    id bigint unsigned auto_increment primary key,  
	contenido	TINYBLOB				not null,
	mime		varchar(255),
	name		varchar(255)		not null,
	id_articulo		bigint 	unsigned	not null,
	foreign key (id_articulo) references articulo(id)
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla comentario 

create table comentario (
    id bigint unsigned auto_increment primary key,
	cuerpo			varchar(255)		not null,
	fecha			date				not null,
	id_articulo		bigint 	unsigned	not null,
	foreign key (id_articulo) references articulo(id)
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla parrafo 

create table parrafo (
    id bigint unsigned auto_increment primary key,
	cuerpo			varchar(255)		not null,
	id_articulo		bigint 	unsigned	not null,
	foreign key (id_articulo) references articulo(id)
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla tipoarticulo_articulo 

create table tipo_articulo (
    id_tipo	bigint 	unsigned	not null,
	id_articulo		bigint 	unsigned	not null,
	primary key (id_tipoarticulo,id_articulo),
	foreign key (id_articulo) references articulo(id),
	foreign key (id_tipo) references tipo(id)
);
----------------------------------------------------------------------------------------------
---- creacion de la tabla tematica_articulo 

create table tematica_articulo (
    id_tematica		bigint 	unsigned	not null,
	id_articulo		bigint 	unsigned	not null,
	primary key (id_tematica,id_articulo),
	foreign key (id_articulo) references articulo(id),
	foreign key (id_tematica) references tematica(id)
);