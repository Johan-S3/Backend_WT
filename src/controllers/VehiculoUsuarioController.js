import { ResponseProvider } from "../providers/ResponseProvider.js";
import VehiculoUsuarioService from "../services/VehiculoUsuarioService.js";

class VehiculoUsuarioController {
  // Obtener todos las relaciones entre los vehiculos y los usuarios
  static getAllVehiculosUsuarios = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await VehiculoUsuarioService.getVehiculosUsuarios();
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

  // Obtener un registro de relación entre usuario y vehiculo por su ID
  static getVehiculoUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el servicio de vehiculo por su ID
      const response = await VehiculoUsuarioService.getVehiculoUsuarioById(id);
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

  // Crear una nueva realción entre un vehiculo y un usuario
  static createVehiculoUsuario = async (req, res) => {
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      const response = await VehiculoUsuarioService.createVehiculoUsuario(campos);
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

  // Actualizar un servicio de vehiculo
  static updateVehiculoUsuario = async (req, res) => {
    const { id } = req.params;
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      // Crear una instancia de la clase VehiculoUsuarioService
      const response = await VehiculoUsuarioService.updateVehiculoUsuario(id, campos);
      // Validamos si no se pudo actualizar la vehiculo
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

  // Eliminar un vehiculo
  static deleteVehiculoUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el vehiculo
      const response = await VehiculoUsuarioService.deletevehiculoUsuario(id);
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
export default VehiculoUsuarioController;