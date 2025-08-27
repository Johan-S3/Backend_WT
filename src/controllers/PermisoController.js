import { ResponseProvider } from "../providers/ResponseProvider.js";
import PermisoService from "../services/PermisoService.js";

class PermisoController {

  // Obtener todos los permisos
  static getAllPermisos = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los permisos
      const response = await PermisoService.getPermisos();
      // Validamos si no hay permisos
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

  // Obtener un permiso por su ID
  static getPermisoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el permiso por su ID
      const response = await PermisoService.getPermisoById(id);
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

  // Crear un nuevo permiso
  static createPermiso = async (req, res) => {
    const campos = req.body;
    try {
      const response = await PermisoService.createPermiso(campos);
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

  // Actualizar un permiso
  static updatePermiso = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase permiso
      const permiso = await PermisoService.updatePermiso(id, campos);
      // Validamos si no se pudo actualizar el permiso
      if (permiso.error) {
        ResponseProvider.error(
          res,
          permiso.message,
          permiso.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        permiso.data,
        permiso.message,
        permiso.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un permiso
  static deletePermiso = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el permiso
      const response = await PermisoService.deletePermiso(id);
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
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default PermisoController;