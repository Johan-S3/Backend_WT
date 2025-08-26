import CRUD from "../models/CRUD.js";

class TipoLavadoService {

    static async getTiposLavados() {
        try {
            const CRUDInstance = new CRUD();
            const tiposLavados = await CRUDInstance.getAll("tipos_lavados", "los tipos de lavados");
            // Validamos si no hay tipos de lavados
            if (tiposLavados.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay tipos de lavados registrados",
                };
            }
            // Retornamos los tipos de lavados obtenidos
            return {
                error: false,
                code: 200,
                message: "Tipos de lavados obtenidos correctamente",
                data: tiposLavados,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los tipos de lavados",
            };
        }
    }

    static async getTipoLavadoById(id) {
        try {
            const CRUDInstance = new CRUD();
            const tipoLavado = await CRUDInstance.getByID("tipos_lavados", id, "el tipo de lavado");
            // Validamos si no hay tipos de lavados con ese ID
            if (tipoLavado.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Tipo de lavado no encontrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Tipo de lavado obtenido correctamente",
                data: tipoLavado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el tipo de lavado",
            };
        }
    }

    static async createTipoLavado(campos) {
        try {
            // Se instancia la clase vehiculo para poder acceder a sus metodos.
            const CRUDInstance = new CRUD();

            let { id_tipo_vehiculo } = campos;

            // Se busca un tipo de vehiculo por el ID ingresado
            const tipoVehiculoExiste = await CRUDInstance.getByID("tipos_vehiculos", id_tipo_vehiculo, "el tipo de vehiculo");
            // Validamos si existe el tipo de vehiculo con ese ID
            if (tipoVehiculoExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El tipo de vehiculo ingresado no existe",
                };
            }

            // Se intenta crear el tipo de lavado
            const tipoLavado = await CRUDInstance.create("tipos_lavados", campos, "el tipo de lavado");
            // Validamos si no se pudo crear el tipo de lavado
            if (tipoLavado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al crear el tipo de lavado",
                };
            }
            // Retornamos el nuevo tipo de lavado creado
            return {
                error: false,
                code: 201,
                message: "Tipo de lavado creado correctamente",
                data: tipoLavado,
            };

        } catch (error) {
            console.log(error);
            return {
                error: true,
                code: 500,
                message: "Error interno al crear el tipo de lavado",
            };
        }
    }

    static async updatetTipoLavado(id, campos) {
        try {
            // Se instancia la clase vehiculo para poder acceder a sus metodos.
            const CRUDInstance = new CRUD();

            // Se busca un tipo de lavado por el ID ingresado
            const tipoLavadoExiste = await CRUDInstance.getByID("tipos_lavados", id, "el tipo de lavado");
            // Validamos si existe el tipo de lavado con ese ID
            if (tipoLavadoExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "Tipo de lavado no encontrado",
                };
            }

            let { id_tipo_vehiculo } = campos;

            // Se busca un tipo de vehiculo por el ID ingresado
            const tipoVehiculoExiste = await CRUDInstance.getByID("tipos_vehiculos", id_tipo_vehiculo, "el tipo de vehiculo");
            // Validamos si existe el tipo de vehiculo con ese ID
            if (tipoVehiculoExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "El tipo de vehiculo ingresado no existe",
                };
            }

            // Se intenta actualizar el Vehiculo
            const tipoLavado = await CRUDInstance.update("tipos_lavados", id, campos, "El tipo de lavado");
            // Validamos si no se pudo actualizar el registro de la relación
            if (tipoLavado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el tipo de lavado",
                };
            }
            // Retornamos el tipoLavado actualizado
            return {
                error: false,
                code: 200,
                message: "Tipo de lavado actualizado correctamente",
                data: tipoLavado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error interno al actualizar el tipo de lavado",
            };
        }
    }

    static async deletetipoLavado(id) {
        try {
            const CRUDInstance = new CRUD();

            // Se busca un tipo de lavado por el ID ingresado
            const tipoLavadoExiste = await CRUDInstance.getByID("tipos_lavados", id, "el tipo de lavado");
            // Validamos si existe el tipo de lavado con ese ID
            if (tipoLavadoExiste.length == 0) {
                return {
                    error: true,
                    code: 400,
                    message: "Tipo de lavado no encontrado",
                };
            }

            // Procedemos a eliminar el tipo de lavado
            const resultado = await CRUDInstance.delete("tipos_lavados", id, "el tipo de lavado");
            // Validamos si no se pudo eliminar el tipo de lavado
            if (!resultado) {
                return {
                    error: true,
                    code: 400,
                    message: "El tipo de lavado no se pudo eliminar",
                };
            }
            // Retornamos la respuesta de eliminación
            return {
                error: false,
                code: 200,
                message: "Tipo de lavado eliminado correctamente"
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                code: 500,
                message: "Error interno al eliminar el tipo de lavado",
            };
        }
    }
}

export default TipoLavadoService;