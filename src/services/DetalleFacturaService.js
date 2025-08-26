import CRUD from "../models/CRUD.js";

class DetalleFacturaService {

  static async getDetallesFacturas() {
    try {
      const CRUDInstance = new CRUD();
      const detallesFacturas = await CRUDInstance.getAll("detalle_factura", "las relaciones entre la factura y los items de lavado");
      // Validamos si no hay detalles facturas
      if (detallesFacturas.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay detalles de facturas registradas",
        };
      }
      // Retornamos los detalles de las facturas obtenidoas
      return {
        error: false,
        code: 200,
        message: "Detalles de facturas obtenidos correctamente",
        data: detallesFacturas,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los detalles de las facturas",
      };
    }
  }

  static async getDetalleFacturaById(id) {
    try {
      const CRUDInstance = new CRUD();
      const detalleFactura = await CRUDInstance.getByID("detalle_factura", id, "el detalle de la factura");
      // Validamos si no hay un detalle factura con ese ID
      if (detalleFactura.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Detalles de factura no encontrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Detalles de factura obtenido correctamente",
        data: detalleFactura[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los detalles de la factura",
      };
    }
  }

  static async createDetalleFactura(campos) {
    try {
      // Se instancia la clase CRUD para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Destructuro el objeto campos para obtener los datos a consultar
      let { id_factura, id_item_lavado } = campos;

      // Se busca una factura por el ID ingresado
      const facturaExiste = await CRUDInstance.getByID("facturas", id_factura, "la factura");
      // Validamos si no existe la factura con ese ID
      if (facturaExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "La factura ingresada no existe",
        };
      }

      // Se busca un item de lavado por el ID ingresado
      const itemLavadoExiste = await CRUDInstance.getByID("items_lavados", id_item_lavado, "el item de lavado");
      // Validamos si no existe el item de lavado con ese ID
      if (itemLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El item ingresado no existe",
        };
      }

      // Se intenta crear el detalle de la factura
      const detalleFactura = await CRUDInstance.create("detalle_factura", campos, "el detalle de la factura");
      // Validamos si no se pudo crear el detalle de la factura
      if (detalleFactura === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el detalle de la factura",
        };
      }
      // Retornamos el nuevo detalle de factura
      return {
        error: false,
        code: 201,
        message: "Detalle de la factura creada correctamente",
        data: detalleFactura,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el detalle de la factura",
      };
    }
  }

  static async updateDetalleFactura(id, campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se busca el detale de la factura por el ID ingresado
      const detalleFacturaExiste = await CRUDInstance.getByID("detalle_factura", id, "el detalle de la factura");
      // Validamos si no existe el detalle de la factura con ese ID
      if (detalleFacturaExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Detalle de factura no encontrado",
        };
      }

      // Destructuro el objeto campos para obtener los datos a consultar
      let { id_factura, id_item_lavado } = campos;

      // Se busca una factura por el ID ingresado
      const facturaExiste = await CRUDInstance.getByID("facturas", id_factura, "la factura");
      // Validamos si no existe la factura con ese ID
      if (facturaExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "La factura ingresada no existe",
        };
      }

      // Se busca un item de lavado por el ID ingresado
      const itemLavadoExiste = await CRUDInstance.getByID("items_lavados", id_item_lavado, "el item de lavado");
      // Validamos si no existe el item de lavado con ese ID
      if (itemLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El item ingresado no existe",
        };
      }

      // Se intenta actualizar el detalle de la factura
      const detalleFactura = await CRUDInstance.update("detalle_factura", id, campos, "el detalle de la factura");
      // Validamos si no se pudo actualizar el detalle de la factura
      if (detalleFactura === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el detalle de la factura",
        };
      }
      // Retornamos el detalle de factura actualizado
      return {
        error: false,
        code: 200,
        message: "Detalle de factura actualizado correctamente",
        data: detalleFactura,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el detalle de factura",
      };
    }
  }

  static async deleteDetalleFactura(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se busca el detalleFactura por el ID ingresado
      const detalleFacturaExiste = await CRUDInstance.getByID("detalle_factura", id, "el detalle de la factura");
      // Validamos si no existe el detalle de la factura con ese ID
      if (detalleFacturaExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Detalle de factura no encontrado",
        };
      }

      // Procedemos a eliminar el detalle de la factura
      const resultado = await CRUDInstance.delete("detalle_factura", id, "el detalle de factura");
      // Validamos si no se pudo eliminar el detalle de factura
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "El detalle de factura no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Detalle de factura eliminado correctamente"
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el detalle de factura",
      };
    }
  }
}

export default DetalleFacturaService;