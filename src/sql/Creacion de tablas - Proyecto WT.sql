use proyecto_wt;

create table roles(
id_rol int auto_increment primary key,
nombre_rol varchar(35) UNIQUE not null);

create table permisos(
id_permiso int auto_increment primary key,
nombre_permiso varchar(35) UNIQUE not null,
descripcion_permiso varchar (50) not null);

create table permisos_roles(
id_permiso_rol int auto_increment primary key,
id_rol int not null,
id_permiso int not null,
foreign key (id_rol) references roles(id_rol),
foreign key (id_permiso) references permisos(id_permiso));

create table usuarios(
id_usuario int primary key auto_increment,
cedula bigint not null unique,
nombre varchar(40) not null,
telefono varchar(10) not null,
correo varchar(50) not null unique,
contrasena varchar(250) not null,
id_rol int not null,
activo boolean default true,
foreign key (id_rol) references roles(id_rol));

create table tipos_vehiculos(
id_tipo_vehiculo int auto_increment primary key,
nombre_tipo varchar(20) Unique not null);

create table servicios_vehiculos(
id_servicio_vehiculo int auto_increment primary key,
nombre_servicio varchar(20) not null unique,
porcentaje_descuento int default 0);

create table vehiculos(
id_vehiculo int primary key auto_increment,
placa varchar(6) unique not null,
marca_vehiculo varchar(30) not null,
modelo_vehiculo int(4) not null,
clave varchar(10) null,
id_tipo_vehiculo int not null,
id_servicio_vehiculo int not null,
foreign key(id_tipo_vehiculo) references tipos_vehiculos(id_tipo_vehiculo),
foreign key(id_servicio_vehiculo) references servicios_vehiculos(id_servicio_vehiculo));

create table vehiculos_usuarios(
id_vehiculo_usuario int auto_increment primary key,
id_vehiculo int not null,
id_usuario int not null,
foreign key(id_vehiculo) references vehiculos(id_vehiculo),
foreign key(id_usuario) references usuarios(id_usuario));

create table tipos_lavados(
id_tipo_lavado int auto_increment primary key,
nombre varchar(25) not null,
descripcion text,
id_tipo_vehiculo int not null,
foreign key(id_tipo_vehiculo) references tipos_vehiculos(id_tipo_vehiculo));

create table items_lavados(
id_item_lavado int auto_increment primary key,
nombre varchar(25) not null,
descripcion text,
valor bigint not null,
id_tipo_vehiculo int not null,
foreign key(id_tipo_vehiculo) references tipos_vehiculos(id_tipo_vehiculo));

create table items_tipos_lavados(
id_item_tipo_lavado int auto_increment primary key,
id_tipo_lavado int not null,
id_item_lavado int not null,
foreign key(id_tipo_lavado) references tipos_lavados(id_tipo_lavado),
foreign key(id_item_lavado) references items_lavados(id_item_lavado));

create table estados(
id_estado int auto_increment primary key,
nombre_estado varchar(50) not null);

create table lavados(
id_lavado int auto_increment primary key,
id_vehiculo int not null,
id_tipo_lavado int not null,
id_usuario int not null,
id_estado int not null,
foreign key(id_vehiculo) references vehiculos(id_vehiculo),
foreign key(id_tipo_lavado) references tipos_lavados(id_tipo_lavado),
foreign key(id_usuario) references usuarios(id_usuario),
foreign key(id_estado) references estados(id_estado));

create table facturas(
id_factura int primary key auto_increment,
fecha timestamp DEFAULT CURRENT_TIMESTAMP,
foreign key(id_lavado) references lavados(id_lavado));

create table detalle_factura(
id_detalle int auto_increment primary key,
id_factura int not null,
id_item_lavado int not null,
nombre_item_snapshot varchar(25),
cacntidad int not null,
precio_unitario bigint not null,
foreign key(id_factura) references facturas(id_factura),
foreign key(id_item_lavado) references items_lavados(id_item_lavado));


show tables;