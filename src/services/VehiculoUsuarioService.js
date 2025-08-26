import CRUD from "../models/CRUD.js";

class VehiculoUsuarioService {

    static async getVehiculosUsuarios() {
        try {
            const CRUDInstance = new CRUD();
            const vehiculosUsuarios = await CRUDInstance.getAll("vehiculos_usuarios", "la relación entre los vehiculos y usuarios");
            // Validamos si no hay vehiculos y usuarios en la tabla relacional
            if (vehiculosUsuarios.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay registros de vehiculos y usuarios relacionados",
                };
            }
            // Retornamos los vehiculos_usuarios obtenidos
            return {
                error: false,
                code: 200,
                message: "Relaciones de vehiculos y usuarios obtenidos correctamente",
                data: vehiculosUsuarios,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las relaciones entre los vehiculos y usuarios",
            };
        }
    }

    static async getVehiculoUsuarioById(id) {
        try {
            const CRUDInstance = new CRUD();
            const vehiculoUsuario = await CRUDInstance.getByID("vehiculos_usuarios", id, "la relación entre el vehiculo y usuario");
            // Validamos si no hay vehiculos_usuarios con ese ID
            if (vehiculoUsuario.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Relacion entre vehjiculo y usuario no encontrada",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Relación entre vehiculo y usuario obtenida correctamente",
                data: vehiculoUsuario,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener la relación entre el vehiculo y usuario",
            };
        }
    }

    static async createVehiculoUsuario(campos) {
        try {
            // Se instancia la clase vehiculo para poder acceder a sus metodos.
            const CRUDInstance = new CRUD();

            let { id_vehiculo, id_usuario } = campos;

            // Se busca un Vehiculo por el ID ingresado
            const vehiculoIdExiste = await CRUDInstance.getByID("vehiculos", id_vehiculo, "el vehiculo");
            // Validamos si existe el vehiculo con ese ID
            if (vehiculoIdExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El vehiculo ingresado no existe",
                };
            }

            // Se busca un Usuario por el ID ingresado
            const UsuarioIdExiste = await CRUDInstance.getByID("usuarios", id_usuario, "el usuario");
            // Validamos si existe el vehiculo con ese ID
            if (UsuarioIdExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El usuario ingresado no existe",
                };
            }

            // Se intenta crear el registro de la relacion entre el vehiculo y el usuario
            const vehiculoUsuario = await CRUDInstance.create("vehiculos_usuarios", campos, "la relación entre el vehiculo y el usuario");
            // Validamos si no se pudo crear la elación entre el vehiculo y el usuario
            if (vehiculoUsuario === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al crear la relación entre el vehiculo y el usuario",
                };
            }
            // Retornamos el nuevo vehiculo creado
            return {
                error: false,
                code: 201,
                message: "Relacion creada correctamente",
                data: vehiculoUsuario,
            };

        } catch (error) {
            console.log(error);
            return {
                error: true,
                code: 500,
                message: "Error interno al crear la relación entre el vehiculo y el usuario",
            };
        }
    }

    static async updateVehiculoUsuario(id, campos) {
        try {
            // Se instancia la clase vehiculo para poder acceder a sus metodos.
            const CRUDInstance = new CRUD();

            // Se buscar un Vehiculo por el ID ingresado
            const vehiculoUsuarioExiste = await CRUDInstance.getByID("vehiculos_usuarios", id, "el registro de la relación entre un vehiculo y un usuario");
            // Validamos si existe un registro con ese ID
            if (vehiculoUsuarioExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "No existe una relación entre un vehiculo y un usuario con el ID ingresado",
                };
            }

            let { id_vehiculo, id_usuario } = campos;

            // Se busca un Vehiculo por el ID ingresado
            const vehiculoIdExiste = await CRUDInstance.getByID("vehiculos", id_vehiculo, "el vehiculo");
            // Validamos si existe el vehiculo con ese ID
            if (vehiculoIdExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El vehiculo ingresado no existe",
                };
            }

            // Se busca un Usuario por el ID ingresado
            const UsuarioIdExiste = await CRUDInstance.getByID("usuarios", id_usuario, "el usuario");
            // Validamos si existe el vehiculo con ese ID
            if (UsuarioIdExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El usuario ingresado no existe",
                };
            }

            // Se intenta actualizar el Vehiculo
            const vehiculoUsuario = await CRUDInstance.update("vehiculos_usuarios", id, campos, "la relación entre el vehiculo y el usuario");
            // Validamos si no se pudo actualizar el registro de la relación
            if (vehiculoUsuario === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar la relación entre el vehiculo y el usuario",
                };
            }
            // Retornamos el vehiculoUsuario actualizado
            return {
                error: false,
                code: 200,
                message: "Relación actualizado correctamente",
                data: vehiculoUsuario,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error interno al actualizar la relación",
            };
        }
    }

    static async deletevehiculoUsuario(id) {
        try {
            const CRUDInstance = new CRUD();

            // Se buscar un VehiculoUsuario por el ID ingresado
            const vehiculoUsuarioExiste = await CRUDInstance.getByID("vehiculos_usuarios", id, "el registro de la relación entre un vehiculo y un usuario");
            // Validamos si existe un registro con ese ID
            if (vehiculoUsuarioExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "No existe una relación entre un vehiculo y un usuario con el ID ingresado",
                };
            }

            // Procedemos a eliminar el registro de la ralación
            const resultado = await CRUDInstance.delete("vehiculos_usuarios", id, "el registro de la relación entre un vehiculo y un usuario");
            // Validamos si no se pudo eliminar el Vehiculo
            if (!resultado) {
                return {
                    error: true,
                    code: 400,
                    message: "La relación entre el vehiculo y el usuario no se pudo eliminar",
                };
            }
            // Retornamos la respuesta de eliminación
            return {
                error: false,
                code: 200,
                message: "Relación eliminada correctamente"
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                code: 500,
                message: "Error interno al eliminar la relación",
            };
        }
    }
}

export default VehiculoUsuarioService;