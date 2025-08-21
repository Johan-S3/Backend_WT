import { ResponseProvider } from "../providers/ResponseProvider.js";
import PermisoRolService from "../services/PermisoRolService.js";

class PermisoRolController {

  // Obtener todos los permisos_roles
  static getAllPermisosRoles = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los permisos_roles
      const response = await PermisoRolService.getPermisosRoles();
      // Validamos si no hay permisos_roles
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

  // Obtener un permiso_rol por su ID
  static getPermisoRolById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el permiso_rol por su ID
      const response = await PermisoRolService.getPermisoRolById(id);
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

  // Crear un nuevo permiso_rol
  static createPermisoRol = async (req, res) => {
    const { id_rol, id_permiso } = req.body;
    try {
      const response = await PermisoRolService.createPermisoRol(id_rol, id_permiso);
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
  static updatePermisoRol = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase permisoPermiso
      const permiso = await PermisoRolService.updatepermisoRol(id, campos);
      // Validamos si no se pudo actualizar el permiso_rol
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
  static deletePermisoRol = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el permiso_Rol
      const response = await PermisoRolService.deletePermisoRol(id);
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

}
export default PermisoRolController;