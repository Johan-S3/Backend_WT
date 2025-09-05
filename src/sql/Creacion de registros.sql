use proyecto_wt;

insert into estados_usuarios(nombre_estado) values 
("Activo"),
("Inactivo");

insert into usuarios(cedula, nombre, telefono, correo, contrasena, id_rol, id_estado) values
(1102357038, "Johan Polo", 3227775843, "johan.s310806@gmail.com", "$2a$10$gIEnPJS2JC4Bk8epHuEw3OICcwov98JE5yKGpShXDHqCv2mQzi4Vq", 1, 1);

insert into estados(nombre_estado) values 
("Pendiente"),
("Lavando"),
("Completado");

insert into tipos_vehiculos (nombre_tipo) values
("Carro"),
("Moto");

insert into servicios_vehiculos (nombre_servicio, porcentaje_descuento) values
("Particular", 0);

insert into vehiculos (placa, marca_vehiculo, modelo_vehiculo, id_tipo_vehiculo, id_servicio_vehiculo) values ("HLH02H", "TVS Stryker 125", 2025, 2, 1);

select * from vehiculos;
select * from usuarios;
select * from roles;
select * from lavados;
