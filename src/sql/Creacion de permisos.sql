use proyecto_wt;

-- Insertar permisos para roles
insert into permisos (nombre_permiso, descripcion_permiso) values
('roles.index', 'Listar todos los roles'),
('roles.create', 'Crear un nuevo rol'),
('roles.update', 'Editar un rol existente'),
('roles.delete', 'Eliminar un rol');

-- Insertar permisos para permisos
insert into permisos (nombre_permiso, descripcion_permiso) values
('permisos.index', 'Listar todos los permisos'),
('permisos.create', 'Crear un nuevo permiso'),
('permisos.update', 'Editar un permiso existente'),
('permisos.delete', 'Eliminar un permiso');

-- Insertar permisos para permisos_roles
insert into permisos (nombre_permiso, descripcion_permiso) values
('permisos_roles.index', 'Listar asignaciones de permisos a roles'),
('permisos_roles.create', 'Asignar un permiso a un rol'),
('permisos_roles.update', 'Editar un permiso asignado a un rol'),
('permisos_roles.delete', 'Eliminar un permiso asignado a un rol');

-- Insertar permisos para usuarios
insert into permisos (nombre_permiso, descripcion_permiso) values
('usuarios.index', 'Listar todos los usuarios'),
('usuarios.create', 'Crear un nuevo usuario'),
('usuarios.update', 'Editar un usuario existente'),
('usuarios.delete', 'Eliminar un usuario');

-- Insertar permisos para tipos_vehiculos
insert into permisos (nombre_permiso, descripcion_permiso) values
('tipos_vehiculos.index', 'Listar todos los tipos de vehículos'),
('tipos_vehiculos.create', 'Crear un tipo de vehículo'),
('tipos_vehiculos.update', 'Editar un tipo de vehículo'),
('tipos_vehiculos.delete', 'Eliminar un tipo de vehículo');

-- Insertar permisos para servicios_vehiculos
insert into permisos (nombre_permiso, descripcion_permiso) values
('servicios_vehiculos.index', 'Listar todos los servicios de vehículos'),
('servicios_vehiculos.create', 'Crear un servicio de vehículo'),
('servicios_vehiculos.update', 'Editar un servicio de vehículo'),
('servicios_vehiculos.delete', 'Eliminar un servicio de vehículo');

-- Insertar permisos para vehiculos
insert into permisos (nombre_permiso, descripcion_permiso) values
('vehiculos.index', 'Listar todos los vehículos'),
('vehiculos.create', 'Crear un nuevo vehículo'),
('vehiculos.update', 'Editar un vehículo existente'),
('vehiculos.delete', 'Eliminar un vehículo');

-- Insertar permisos para vehiculos_usuarios
insert into permisos (nombre_permiso, descripcion_permiso) values
('vehiculos_usuarios.index', 'Listar relación entre vehículos y usuarios'),
('vehiculos_usuarios.create', 'Asignar un vehículo a un usuario'),
('vehiculos_usuarios.update', 'Editar la relación vehículo-usuario'),
('vehiculos_usuarios.delete', 'Eliminar la relación vehículo-usuario');

-- Insertar permisos para tipos_lavados
insert into permisos (nombre_permiso, descripcion_permiso) values
('tipos_lavados.index', 'Listar todos los tipos de lavados'),
('tipos_lavados.create', 'Crear un tipo de lavado'),
('tipos_lavados.update', 'Editar un tipo de lavado'),
('tipos_lavados.delete', 'Eliminar un tipo de lavado');

-- Insertar permisos para items_lavados
insert into permisos (nombre_permiso, descripcion_permiso) values
('items_lavados.index', 'Listar todos los ítems de lavados'),
('items_lavados.create', 'Crear un ítem de lavado'),
('items_lavados.update', 'Editar un ítem de lavado'),
('items_lavados.delete', 'Eliminar un ítem de lavado');

-- Insertar permisos para items_tipos_lavados
insert into permisos (nombre_permiso, descripcion_permiso) values
('items_tipos_lavados.index', 'Listar relación ítems y tipos de lavados'),
('items_tipos_lavados.create', 'Asignar un ítem a un tipo de lavado'),
('items_tipos_lavados.update', 'Editar la relación ítem-tipo de lavado'),
('items_tipos_lavados.delete', 'Eliminar la relación ítem-tipo de lavado');

-- Insertar permisos para estados
insert into permisos (nombre_permiso, descripcion_permiso) values
('estados.index', 'Listar todos los estados'),
('estados.create', 'Crear un nuevo estado'),
('estados.update', 'Editar un estado'),
('estados.delete', 'Eliminar un estado');

-- Insertar permisos para lavados
insert into permisos (nombre_permiso, descripcion_permiso) values
('lavados.index', 'Listar todos los lavados'),
('lavados.create', 'Registrar un nuevo lavado'),
('lavados.update', 'Editar un lavado existente'),
('lavados.delete', 'Eliminar un lavado');

-- Insertar permisos para facturas
insert into permisos (nombre_permiso, descripcion_permiso) values
('facturas.index', 'Listar todas las facturas'),
('facturas.create', 'Crear una nueva factura'),
('facturas.update', 'Editar una factura existente'),
('facturas.delete', 'Eliminar una factura');

-- Insertar permisos para detalle_factura
insert into permisos (nombre_permiso, descripcion_permiso) values
('detalle_factura.index', 'Listar detalles de facturas'),
('detalle_factura.create', 'Crear un detalle de factura'),
('detalle_factura.update', 'Editar un detalle de factura'),
('detalle_factura.delete', 'Eliminar un detalle de factura');
