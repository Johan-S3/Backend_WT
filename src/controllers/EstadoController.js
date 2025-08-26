import { ResponseProvider } from "../providers/ResponseProvider.js";
import EstadoService from "../services/estadoService.js";

class EstadoController {
  // Obtener todos los estados
  static getAllEstados = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await EstadoService.getEstados();
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

  // Obtener un estado por su ID
  static getEstadoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el estado por su ID
      const response = await EstadoService.getEstadoById(id);
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

  // Crear un estado
  static createEstado = async (req, res) => {
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      const response = await EstadoService.createEstado(campos);
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

  // Actualizar un estado
  static updateEstado = async (req, res) => {
    const { id } = req.params;
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      // Crear una instancia de la clase EstadoService
      const response = await EstadoService.updateEstado(id, campos);
      // Validamos si no se pudo actualizar el estado
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

  // Eliminar un estado
  static deleteEstado = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el estado
      const response = await EstadoService.deleteEstado(id);
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
export default EstadoController;