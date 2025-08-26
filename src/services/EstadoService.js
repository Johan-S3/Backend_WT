import CRUD from "../models/CRUD.js";
import Lavado from "../models/Lavado.js";

class EstadoService {

  static async getEstados() {
    try {
      const CRUDInstance = new CRUD();
      const estados = await CRUDInstance.getAll("estados", "los estados");
      // Validamos si no hay estados
      if (estados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay estados registrados",
        };
      }
      // Retornamos los estados obtenidos
      return {
        error: false,
        code: 200,
        message: "Estados obtenidos correctamente",
        data: estados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los estados",
      };
    }
  }

  static async getEstadoById(id) {
    try {
      const CRUDInstance = new CRUD();
      const estado = await CRUDInstance.getByID("estados", id, "el estado");
      // Validamos si no hay un estado con ese ID
      if (estado.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Estado no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Estado obtenido correctamente",
        data: estado[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el estado",
      };
    }
  }

  static async createEstado(campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se intenta crear el estado
      const estado = await CRUDInstance.create("estados", campos, "el estado");
      // Validamos si no se pudo crear es estado
      if (estado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el estado",
        };
      }
      // Retornamos el nuevo estado
      return {
        error: false,
        code: 201,
        message: "Estado creado correctamente",
        data: estado,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el estado",
      };
    }
  }

  static async updateEstado(id, campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se busca el estado por el ID ingresado
      const estadoExiste = await CRUDInstance.getByID("estados", id, "el estado");
      // Validamos si no existe el estado con ese ID
      if (estadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Estado no encontrado",
        };
      }

      // Se intenta actualizar el estado
      const estado = await CRUDInstance.update("estados", id, campos, "el estado");
      // Validamos si no se pudo actualizar el estado
      if (estado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el estado",
        };
      }
      // Retornamos el estado actualizado
      return {
        error: false,
        code: 200,
        message: "Estado actualizado correctamente",
        data: estado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el estado",
      };
    }
  }

  static async deleteEstado(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se busca el estado por el ID ingresado
      const estadoExiste = await CRUDInstance.getByID("estados", id, "el estado");
      // Validamos si no existe el estado con ese ID
      if (estadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Estado no encontrado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const lavadoInstance = new Lavado();
      // Consultamos un lavado por el ID del estado
      const estadoWithLavado = await lavadoInstance.getByIdEstado(id);
      // Validamos si existe un lavado con el Id de estado ingresado
      if (estadoWithLavado.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el estado porque está asociado a un lavado",
        };
      }

      // Procedemos a eliminar el estado
      const resultado = await CRUDInstance.delete("estados", id, "el estado");
      // Validamos si no se pudo eliminar el estado
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "El estado no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Estado eliminado correctamente"
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el estado",
      };
    }
  }
}

export default EstadoService;