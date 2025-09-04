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