import { ResponseProvider } from "../providers/ResponseProvider.js";
import FacturaService from "../services/FacturaService.js";

class FacturaController {
  // Obtener todas las facturas
  static getAllFacturas = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await FacturaService.getFacturas();
      // Validamos si hay errores en la respuesta de la peticion para mostrar
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener todas las facturas con su informacion
  static getAllInfoFacturas = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await FacturaService.getInfoFacturas();
      // Validamos si hay errores en la respuesta de la peticion para mostrar
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una factura por su ID
  static getFacturaById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la factura por su ID
      const response = await FacturaService.getFacturaById(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una factura con sus items por su ID
  static getFacturaItemsByIdFactura = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la factura con sus items por su ID
      const response = await FacturaService.getFacturaItemsByIdFactura(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una factura
  static createFactura = async (req, res) => {
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      const response = await FacturaService.createFactura(campos);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una factura
  static updateFactura = async (req, res) => {
    const { id } = req.params;
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      // Crear una instancia de la clase FacturaService
      const response = await FacturaService.updateFactura(id, campos);
      // Validamos si no se pudo actualizar la factura
      if (response.error) {
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor" + error, 500);
    }
  };

  // Eliminar una factura
  static deleteFactura = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la factura
      const response = await FacturaService.deleteFactura(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          null,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

}
export default FacturaController;