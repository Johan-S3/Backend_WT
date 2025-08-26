import CRUD from "../models/CRUD.js";

class ItemTipoLavadoService {

  static async getItemsTiposLavados() {
    try {
      const CRUDInstance = new CRUD();
      const itemsTiposLavados = await CRUDInstance.getAll("items_tipos_lavados", "los registros de la relación entre los items y tipos de lavados");
      // Validamos si no hay items de lavados
      if (itemsTiposLavados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay relaciones entre items y tipos de lavados registradas",
        };
      }
      // Retornamos los items de lavados obtenidos
      return {
        error: false,
        code: 200,
        message: "Relaciones entre tipos y items de lavados obtenidos correctamente",
        data: itemsTiposLavados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las relaciones entre los items y tipos de lavados",
      };
    }
  }

  static async getItemTipoLavadoById(id) {
    try {
      const CRUDInstance = new CRUD();
      const itemTipoLavado = await CRUDInstance.getByID("items_tipos_lavados", id, "el registro de la relación entre los items y tipos de lavados");
      // Validamos si no hay relacion entre el tipo y item de lavado con ese ID
      if (itemTipoLavado.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Relación entre tipos y items de lavados no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Relación entre tipos y items de lavados obtenida correctamente",
        data: itemTipoLavado[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la relación entre los items y tipos de lavados",
      };
    }
  }

  static async createItemTipoLavado(campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      let { id_tipo_lavado, id_item_lavado } = campos;

      // Se busca un tipo de lavado por el ID ingresado
      const tipoLavadoExiste = await CRUDInstance.getByID("tipos_lavados", id_tipo_lavado, "el tipo de lavado");
      // Validamos si no existe el tipo de lavado con ese ID
      if (tipoLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El tipo de lavado ingresado no existe",
        };
      }

      // Se busca un item de lavado por el ID ingresado
      const itemLavadoExiste = await CRUDInstance.getByID("items_lavados", id_item_lavado, "el item de lavado");
      // Validamos si no existe el item de lavado con ese ID
      if (itemLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El item de lavado ingresado no existe",
        };
      }

      // Se intenta crear el registro de la relación entre un tipo de lavado y un item de lavado
      const itemTipoLavado = await CRUDInstance.create("items_tipos_lavados", campos, "la relación entre el tipo de lavado y el item de lavado");
      // Validamos si no se pudo crear la relacion
      if (itemTipoLavado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el la relación entre un tipo y item de lavado",
        };
      }
      // Retornamos la nueva relación creada
      return {
        error: false,
        code: 201,
        message: "Relación creada correctamente",
        data: itemTipoLavado,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la relación",
      };
    }
  }

  static async updatetItemTipoLavado(id, campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se busca la relación por el ID ingresado
      const itemTipoLavadoExiste = await CRUDInstance.getByID("items_tipos_lavados", id, "la relación entre el item y tipo de lavado");
      // Validamos si no existe la relación con ese ID
      if (itemTipoLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Relación no encontrada",
        };
      }

      let { id_tipo_lavado, id_item_lavado } = campos;

      // Se busca un tipo de lavado por el ID ingresado
      const tipoLavadoExiste = await CRUDInstance.getByID("tipos_lavados", id_tipo_lavado, "el tipo de lavado");
      // Validamos si no existe el tipo de lavado con ese ID
      if (tipoLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El tipo de lavado ingresado no existe",
        };
      }

      // Se busca un item de lavado por el ID ingresado
      const itemLavadoExiste = await CRUDInstance.getByID("items_lavados", id_item_lavado, "el item de lavado");
      // Validamos si no existe el item de lavado con ese ID
      if (itemLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El item de lavado ingresado no existe",
        };
      }

      // Se intenta actualizar la relación
      const itemTipoLavado = await CRUDInstance.update("items_tipos_lavados", id, campos, "la relación entre el item y tipo de lavado");
      // Validamos si no se pudo actualizar la relación
      if (itemTipoLavado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la relación",
        };
      }
      // Retornamos la relación actualizada
      return {
        error: false,
        code: 200,
        message: "Relación actualizada correctamente",
        data: itemTipoLavado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la relacion",
      };
    }
  }

  static async deleteItemTipoLavado(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se busca una relacion por el ID ingresado
      const itemTipoLavadoExiste = await CRUDInstance.getByID("items_tipos_lavados", id, "la relación entre el item y el tipo de lavado");
      // Validamos si existe el item de lavado con ese ID
      if (itemTipoLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Relación no encontrada",
        };
      }

      // Procedemos a eliminar el item de lavado
      const resultado = await CRUDInstance.delete("items_tipos_lavados", id, "la relación entre el item y el tipo de lavado");
      // Validamos si no se pudo eliminar la relación
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "La relación no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Relación eliminado correctamente"
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

export default ItemTipoLavadoService;