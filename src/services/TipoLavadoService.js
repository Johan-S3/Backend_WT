import CRUD from "../models/CRUD.js";
import ItemTipoLavado from "../models/ItemTipoLavado.js";
import Lavado from "../models/Lavado.js";
import TipoLavado from "../models/TipoLavado.js";

class TipoLavadoService {

  static async getAllTiposLavados() {
    try {
      const tipoLavadoInstance = new TipoLavado();
      const tiposLavados = await tipoLavadoInstance.getTiposLavados();
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
  static async getTiposLavadosLibres() {
    try {
      const tipoLavadoInstance = new TipoLavado();
      const tiposLavados = await tipoLavadoInstance.getTiposLavadosLibres();
      // Validamos si no hay tipos de lavados
      if (tiposLavados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay tipos de lavados libres registrados",
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

      // Instancio la clase que necesito para realizar otras consultas
      const itemTipoLavadoInstance = new ItemTipoLavado();
      // Se busca si existe el tipo de lavado relacionado em la tabla items_tipos_lavados
      const itemIipoLavadoExiste = await itemTipoLavadoInstance.getByIdTipoLavado(id);
      // Validamos si existe el tipo de lavado en la tabla relacional 
      if (itemIipoLavadoExiste.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el tipo de lavado porque esta asociado a un item",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const lavadoInstance = new Lavado();
      // Consultamos un lavado por el ID del tipo de lavado
      const tipoLavadoWithLavado = await lavadoInstance.getByIdTipoLavado(id);
      // Validamos si existe un lavado con el Id de vehiculo ingresado
      if (tipoLavadoWithLavado.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el tipo de lavado porque está asociado a un lavado",
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