import { ResponseProvider } from "../providers/ResponseProvider.js";
import RolService from "../services/RolService.js";

class RolController {

  // Obtener los roles 
  static getAllRoles = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los roles
      const response = await RolService.getRoles();
      // Validamos si no hay ROLES
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
  // Obtener los roles unicos
  static getAllRolesUnicos = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los roles
      const response = await RolService.getRolesUnicos();
      // Validamos si no hay ROLES
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

  // Obtener un rol por su ID
  static getRolById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el rol por su ID
      const response = await RolService.getRolById(id);
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

  // Crear un nuevo rol
  static createRol = async (req, res) => {
    const campos = req.body;
    try {
      const response = await RolService.createRol(campos);
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

  // Actualizar un rol
  static updateRol = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Rol
      const rol = await RolService.updateRol(id, campos);
      // Validamos si no se pudo actualizar la categoría
      if (rol.error) {
        ResponseProvider.error(
          res,
          rol.message,
          rol.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        rol.data,
        rol.message,
        rol.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un rol
  static deleterol = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la categoría
      const response = await RolService.deleteRol(id);
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
export default RolController;