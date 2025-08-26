import CRUD from "../models/CRUD.js";
import DetalleFactura from "../models/DetalleFactura.js";
import ItemTipoLavado from "../models/ItemTipoLavado.js";

class ItemLavadoService {

  static async getItemsLavados() {
    try {
      const CRUDInstance = new CRUD();
      const itemsLavados = await CRUDInstance.getAll("items_lavados", "los items de lavados");
      // Validamos si no hay items de lavados
      if (itemsLavados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay items de lavados registrados",
        };
      }
      // Retornamos los items de lavados obtenidos
      return {
        error: false,
        code: 200,
        message: "Items de lavados obtenidos correctamente",
        data: itemsLavados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los items de lavados",
      };
    }
  }

  static async getItemLavadoById(id) {
    try {
      const CRUDInstance = new CRUD();
      const itemLavado = await CRUDInstance.getByID("items_lavados", id, "el item de lavado");
      // Validamos si no hay items de lavados con ese ID
      if (itemLavado.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Item de lavado no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Item de lavado obtenido correctamente",
        data: itemLavado[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el item de lavado",
      };
    }
  }

  static async createItemLavado(campos) {
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

      // Se intenta crear el item de lavado
      const itemLavado = await CRUDInstance.create("items_lavados", campos, "el item de lavado");
      // Validamos si no se pudo crear el item de lavado
      if (itemLavado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el item de lavado",
        };
      }
      // Retornamos el nuevo item de lavado creado
      return {
        error: false,
        code: 201,
        message: "Item de lavado creado correctamente",
        data: itemLavado,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el item de lavado",
      };
    }
  }

  static async updatetItemLavado(id, campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se busca un item de lavado por el ID ingresado
      const itemLavadoExiste = await CRUDInstance.getByID("items_lavados", id, "el item de lavado");
      // Validamos si existe el item de lavado con ese ID
      if (itemLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Item de lavado no encontrado",
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
      const itemLavado = await CRUDInstance.update("items_lavados", id, campos, "El item de lavado");
      // Validamos si no se pudo actualizar el item de lavado
      if (itemLavado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el item de lavado",
        };
      }
      // Retornamos el item de lavado actualizado
      return {
        error: false,
        code: 200,
        message: "Item de lavado actualizado correctamente",
        data: itemLavado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el item de lavado",
      };
    }
  }

  static async deleteItemLavado(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se busca un item de lavado por el ID ingresado
      const itemLavadoExiste = await CRUDInstance.getByID("items_lavados", id, "el item de lavado");
      // Validamos si existe el item de lavado con ese ID
      if (itemLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Item de lavado no encontrado",
        };
      }

      // Instancio la clase que necesito para realizar otras consultas
      const itemTipoLavadoInstance = new ItemTipoLavado();
      // Se busca si existe el item de lavado relacionado em la tabla items_tipos_lavados
      const itemIipoLavadoExiste = await itemTipoLavadoInstance.getByIdItemLavado(id);
      // Validamos si existe el item de lavado en la tabla relacional 
      if (itemIipoLavadoExiste.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el item de lavado porque esta asociado a un tipo de lavado",
        };
      }

      // Instancio la clase que necesito para realizar otras consultas
      const detalleFacturaInstance = new DetalleFactura();
      // Se busca si existe el item de lavado relacionado em la tabla detalles_factura
      const itemLavadoWithDetalle = await detalleFacturaInstance.getByIdItemLavado(id);
      // Validamos si existe el item de lavado en la tabla relacional 
      if (itemLavadoWithDetalle.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el item de lavado porque esta asociado a una factura",
        };
      }

      // Procedemos a eliminar el item de lavado
      const resultado = await CRUDInstance.delete("items_lavados", id, "el item de lavado");
      // Validamos si no se pudo eliminar el tipo de lavado
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "El item de lavado no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Item de lavado eliminado correctamente"
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el item de lavado",
      };
    }
  }
}

export default ItemLavadoService;