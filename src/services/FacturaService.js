import CRUD from "../models/CRUD.js";
import DetalleFactura from "../models/DetalleFactura.js";
import Factura from "../models/Factura.js";
import Lavado from "../models/Lavado.js";

class FacturaService {

  static async getFacturas() {
    try {
      const CRUDInstance = new CRUD();
      const facturas = await CRUDInstance.getAll("facturas", "las facturas");
      // Validamos si no hay facturas
      if (facturas.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay facturas registradas",
        };
      }
      // Retornamos las facturas obtenidas
      return {
        error: false,
        code: 200,
        message: "fFacturas obtenidas correctamente",
        data: facturas,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las facturas",
      };
    }
  }

  static async getFacturaById(id) {
    try {
      const CRUDInstance = new CRUD();
      const factura = await CRUDInstance.getByID("facturas", id, "la factura");
      // Validamos si no hay un factura con ese ID
      if (factura.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Factura no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Factura obtenida correctamente",
        data: factura[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la factura",
      };
    }
  }

  static async createFactura(campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Destructuro el objeto campos para obtener los datos a consultar
      let { id_lavado } = campos;

      // Se busca un lavado por el ID ingresado
      const lavadoExiste = await CRUDInstance.getByID("lavados", id_lavado, "el lavado");
      // Validamos si no existe el lavado con ese ID
      if (lavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El lavado ingresado no existe",
        };
      }

      // Se intenta crear la factura
      const factura = await CRUDInstance.create("facturas", campos, "la factura");
      // Validamos si no se pudo crear esa factura
      if (factura === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la factura",
        };
      }
      // Retornamos la nueva factura
      return {
        error: false,
        code: 201,
        message: "Factura creada correctamente",
        data: factura,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la factura",
      };
    }
  }

  static async updateFactura(id, campos) {
    try {
      // Se instancia la clase CRUD para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se busca la factura por la ID ingresado
      const facturaExiste = await CRUDInstance.getByID("facturas", id, "la factura");
      // Validamos si no existe la factura con ese ID
      if (facturaExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Factura no encontrada",
        };
      }

      // Se intenta actualizar la factura
      const factura = await CRUDInstance.update("facturas", id, campos, "la factura");
      // Validamos si no se pudo actualizar la factura
      if (factura === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la factura",
        };
      }
      // Retornamos la factura actualizada
      return {
        error: false,
        code: 200,
        message: "Factura actualizada correctamente",
        data: factura,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la factura",
      };
    }
  }

  static async deleteFactura(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se busca la factura por el ID ingresado
      const facturaExiste = await CRUDInstance.getByID("facturas", id, "la factura");
      // Validamos si no existe la factura con ese ID
      if (facturaExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Factura no encontrada",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const detalleFacturaInstance = new DetalleFactura();
      // Consultamos un detalle de factura por la ID dla factura
      const facturaWithDetalles = await detalleFacturaInstance.getByIdFactura(id);
      // Validamos si existe un detalle de factura con la Id de factura ingresada
      if (facturaWithDetalles.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar la factura porque está asociado a un item de lavado",
        };
      }

      // Procedemos a eliminar la factura
      const resultado = await CRUDInstance.delete("facturas", id, "la factura");
      // Validamos si no se pudo eliminar la factura
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "La factura no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Factura eliminada correctamente"
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la factura",
      };
    }
  }
}

export default FacturaService;