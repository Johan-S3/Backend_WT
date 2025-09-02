use proyecto_wt;

-- =============================
-- CREACIÓN DE ROLES
-- =============================
insert into roles (nombre_rol) values
('Super Administrador'),
('Administrador'),
('Gerente'),
('Lavador'),
('Conductor');


-- =============================
-- ASIGNACIÓN DE PERMISOS A ROLES
-- =============================

-- SUPER ADMINISTRADOR: puede gestionar roles, permisos, permisos_roles y usuarios
insert into permisos_roles (id_rol, id_permiso)
select 1, id
from permisos
where nombre_permiso like 'roles.%'
   or nombre_permiso like 'permisos.%'
   or nombre_permiso like 'permisos_roles.%'
   or nombre_permiso like 'usuarios.%';


-- ADMINISTRADOR: gestiona usuarios, tipos_vehiculos, servicios_vehiculos, vehiculos, items_lavados
-- y solo puede LISTAR facturas y detalle_factura
insert into permisos_roles (id_rol, id_permiso)
select 2, id
from permisos
where nombre_permiso = 'usuarios.index'
   or nombre_permiso like 'tipos_vehiculos.%'
   or nombre_permiso like 'servicios_vehiculos.%'
   or nombre_permiso like 'vehiculos.%'
   or nombre_permiso like 'items_lavados.%'
   or nombre_permiso = 'facturas.index'
   or nombre_permiso = 'detalle_factura.index';


-- GERENTE: 
-- - usuarios (solo listar)
-- - tipos_vehiculos (solo listar)
-- - servicios_vehiculos (solo listar)
-- - vehiculos (listar, crear, update)
-- - vehiculos_usuarios (listar y crear)
-- - tipos_lavados (full)
-- - items_tipos_lavados (full)
-- - conductores (full)
-- - lavados (full)
-- - facturas (solo listar)
-- - detalle_factura (solo listar)
insert into permisos_roles (id_rol, id_permiso)
select 3, id
from permisos
where nombre_permiso = 'usuarios.index'
   or nombre_permiso = 'tipos_vehiculos.index'
   or nombre_permiso = 'servicios_vehiculos.index'
   or nombre_permiso in ('vehiculos.index','vehiculos.create','vehiculos.update')
   or nombre_permiso in ('vehiculos_usuarios.index','vehiculos_usuarios.create')
   or nombre_permiso like 'tipos_lavados.%'
   or nombre_permiso like 'conductores.%'
   or nombre_permiso like 'items_tipos_lavados.%'
   or nombre_permiso like 'lavados.%'
   or nombre_permiso = 'facturas.index'
   or nombre_permiso = 'detalle_factura.index';
   
   
   insert into usuarios(cedula, nombre, telefono, correo, contrasena, id_rol) values
(1102357038, "Johan Polo", 3227775843, "johan.s310806@gmail.com", "Contrasena1234", 1);