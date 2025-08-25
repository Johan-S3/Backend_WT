import TipoVehiculo from "../models/TipoVehiculo.js ";

class TipoVehiculoService {

    static async getTiposVehiculos() {
        try {
            const tipoVehInstance = new TipoVehiculo();
            const tiposVehiculos = await tipoVehInstance.getAll();
            // Validamos si no hay tipos de vehiculos
            if (tiposVehiculos.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay tipos de vehiculos registrados",
                };
            }
            // Retornamos los tipos de vehiculos obtenidos
            return {
                error: false,
                code: 200,
                message: "Tipos de vehiculos obtenidos correctamente",
                data: tiposVehiculos,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los tipos de vehiculos",
            };
        }
    }

    static async getTipoVehiculoById(id) {
        try {
            const tipoVehInstance = new TipoVehiculo();
            const tipoVehiculo = await tipoVehInstance.getById(id);
            // Validamos si no hay tipos de vehiculos
            if (tipoVehiculo.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Tipo de vehiculo no encontrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Tipo de vehiculo obtenido correctamente",
                data: tipoVehiculo,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el tipo de vehiculo",
            };
        }
    }

    static async createTipoVehiculo(nombre) {
        try {
            // Se instancia la clase tipoVehiculo para poder acceder a sus metodos.
            const tipoVehInstance = new TipoVehiculo();

            // Se buscar un permiso por el nombre ingresado
            const tipoVehNameExiste = await tipoVehInstance.getByName(nombre.trim());
            // Validamos si existe el tipo de vehiculo con ese nombre
            if (tipoVehNameExiste.length != 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El nombre del tipo de vehiculo ingresado ya está en uso",
                };
            }

            // Se intenta crear el tipo de vehiculo
            const tipoVehiculo = await tipoVehInstance.create(nombre.trim());
            // Validamos si no se pudo crear el tipo de vehiculo
            if (tipoVehiculo === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al crear el tipo de vehiculo",
                };
            }
            // Retornamos el nuevo permiso creado
            return {
                error: false,
                code: 201,
                message: "Tipo de vehiculo creado correctamente",
                data: tipoVehiculo,
            };

        } catch (error) {
            console.log(error);

            return {
                error: true,
                code: 500,
                message: "Error interno al crear el permiso",
            };
        }
    }

    static async updateTipoVehiculo(id, campos) {
        try {
            const tipoVehInstance = new TipoVehiculo();

            const { nombre_tipo } = campos


            // Consultamos el tipo de vehiculo por id
            const tipoVehExistente = await tipoVehInstance.getById(id);
            // Validamos si no existe el tipo de vehiculo
            if (tipoVehExistente.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Tipo de vehiculo no encontrado",
                };
            }

            // Se buscar un permiso por el nombre ingresado
            const tipoVehNameExiste = await tipoVehInstance.getByName(nombre_tipo.trim());
            // Validamos si existe el tipo de vehiculo con ese nombre
            if (tipoVehNameExiste.length != 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El nombre del tipo de vehiculo ingresado ya está en uso",
                };
            }

            // Se intenta actualizar el tipo de vehiculo
            const tipoVehiculo = await tipoVehInstance.update(id, campos);
            // Validamos si no se pudo actualizar el tipo de vehiculo
            if (tipoVehiculo === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el tipo de vehiculo",
                };
            }
            // Retornamos el tipo de vehiculo actualizado
            return {
                error: false,
                code: 200,
                message: "Tipo de vehiculo actualizado correctamente",
                data: tipoVehiculo,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error interno al actualizar el tipo de vehiculo" + error,
            };
        }
    }

    static async deleteTipoVehiculo(id) {
        try {
            const tipoVehInstance = new TipoVehiculo();
            // Consultamos el tipo de vehiculo por id
            const tipoVehExistente = await tipoVehInstance.getById(id);
            // Validamos si no existe el tipo de vehiculo
            if (tipoVehExistente.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Tipo de vehiculo no encontrado",
                };
            }
            
            // // Instancio la clase del modelo que se necesita.
            // const permisoRolInstance = new PermisoRol();
            // // Consultamos los permisos asociados al rol en la tabla relacional
            // const permisosBeRoles = await permisoRolInstance.getByPermisoId(id);
            // // Validamos si el permiso pertenece a un rol
            // if (permisosBeRoles.length > 0) {
            //     return {
            //         error: true,
            //         code: 400,
            //         message: "No se puede eliminar el permiso debido a que está asociados a uno o más roles.",
            //     };
            // }

            // Procedemos a eliminar el tipo de vehiculo
            const resultado = await tipoVehInstance.delete(id);
            // Validamos si no se pudo eliminar el tipo de vehiculo
            if (resultado.error) {
                return {
                    error: true,
                    code: 400,
                    message: resultado.mensaje,
                };
            }
            // Retornamos la respuesta de eliminación
            return {
                error: false,
                code: 200,
                message: "Tipo de vehiculo eliminado correctamente",
                data: tipoVehExistente,
            };
        } catch (error) {
            console.log(error);

            return {
                error: true,
                code: 500,
                message: "Error interno al eliminar el tipo de vehiculo",
            };
        }
    }

}

export default TipoVehiculoService;