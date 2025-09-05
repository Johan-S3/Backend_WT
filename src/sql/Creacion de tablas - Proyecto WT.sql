use proyecto_wt;

create table roles(
id int auto_increment primary key,
nombre_rol varchar(35) UNIQUE not null);

create table permisos(
id int auto_increment primary key,
nombre_permiso varchar(35) UNIQUE not null,
descripcion_permiso varchar (50) not null);

create table permisos_roles(
id int auto_increment primary key,
id_rol int not null,
id_permiso int not null,
foreign key (id_rol) references roles(id),
foreign key (id_permiso) references permisos(id));

create table estados_usuarios(
id int auto_increment primary key,
nombre_estado varchar(10));

create table usuarios(
id int primary key auto_increment,
cedula bigint not null unique,
nombre varchar(40) not null,
telefono varchar(10) not null,
correo varchar(50) not null unique,
contrasena varchar(250) not null,
id_rol int not null,
id_estado int not null default 1,
foreign key (id_rol) references roles(id),
foreign key (id_estado) references estados_usuarios(id));

create table tipos_vehiculos(
id int auto_increment primary key,
nombre_tipo varchar(20) Unique not null);

create table servicios_vehiculos(
id int auto_increment primary key,
nombre_servicio varchar(20) not null unique,
porcentaje_descuento int not null default 0 );

create table vehiculos(
id int primary key auto_increment,
placa varchar(6) unique not null,
marca_vehiculo varchar(30) not null,
modelo_vehiculo int(4) not null,
clave varchar(10) null,
id_tipo_vehiculo int not null,
id_servicio_vehiculo int not null,
foreign key(id_tipo_vehiculo) references tipos_vehiculos(id),
foreign key(id_servicio_vehiculo) references servicios_vehiculos(id));

create table tipos_lavados(
id int auto_increment primary key,
nombre varchar(25) not null,
descripcion text not null,
id_tipo_vehiculo int not null,
foreign key(id_tipo_vehiculo) references tipos_vehiculos(id));

create table items_lavados(
id int auto_increment primary key,
nombre varchar(25) not null,
descripcion text not null,
valor bigint not null,
id_tipo_vehiculo int not null,
foreign key(id_tipo_vehiculo) references tipos_vehiculos(id));

create table items_tipos_lavados(
id int auto_increment primary key,
id_tipo_lavado int not null,
id_item_lavado int not null,
foreign key(id_tipo_lavado) references tipos_lavados(id),
foreign key(id_item_lavado) references items_lavados(id));

create table estados(
id int auto_increment primary key,
nombre_estado varchar(50) not null);

create table lavados(
id int auto_increment primary key,
id_vehiculo int not null,
id_tipo_lavado int null,
id_conductor int not null,
id_lavador int null,
id_estado int not null,
foreign key(id_vehiculo) references vehiculos(id),
foreign key(id_tipo_lavado) references tipos_lavados(id),
foreign key(id_conductor) references usuarios(id),
foreign key(id_lavador) references usuarios(id),
foreign key(id_estado) references estados(id));

create table facturas(
id int primary key auto_increment,
fecha timestamp DEFAULT CURRENT_TIMESTAMP,
total bigint not null,
id_lavado int not null,
foreign key(id_lavado) references lavados(id));

create table detalle_factura(
id int auto_increment primary key,
id_factura int not null,
id_item_lavado int not null,
nombre_item varchar(25),
precio_item bigint not null,
foreign key(id_factura) references facturas(id),
foreign key(id_item_lavado) references items_lavados(id));


describe vehiculos;
show tables;

