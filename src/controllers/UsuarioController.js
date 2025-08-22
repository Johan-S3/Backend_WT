import { ResponseProvider } from "../providers/ResponseProvider.js";
import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {

  // Obtener todos los usuarios
  static getAllUsuarios = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los usuarios
      const response = await UsuarioService.getUsuarios();
      // Validamos si no hay usuarios
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

  // Obtener un usuario por su ID
  static getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el usuario por su ID
      const response = await UsuarioService.getUsuarioById(id);
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

  // Crear un nuevo usuario
  static createUsuario = async (req, res) => {
    const { cedula, nombre, telefono, correo, id_rol } = req.body;
    try {
      const response = await UsuarioService.createUsuario(cedula, nombre, telefono, correo, id_rol);
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

  // Actualizar un usuario
  static updateUsuario = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const { nombre_usuario } = req.body;
    try {
      // Crear una instancia de la clase usuario
      const usuario = await UsuarioService.updateusuario(id, nombre_usuario);
      // Validamos si no se pudo actualizar la categoría
      if (usuario.error) {
        ResponseProvider.error(
          res,
          usuario.message,
          usuario.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        usuario.data,
        usuario.message,
        usuario.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un usuario
  static deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la categoría
      const response = await UsuarioService.deleteusuario(id);
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
export default UsuarioController;