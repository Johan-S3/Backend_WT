import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

class UsuarioService {

  static async getUsuarios() {
    try {
      const usuarioInstance = new Usuario();
      const usuarios = await usuarioInstance.getAll();
      // Validamos si no hay usuarios
      if (usuarios.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };
      }
      // Retornamos los usuarios obtenidas
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidas correctamente",
        data: usuarios,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los usuarios",
      };
    }
  }

  static async getUsuarioById(id) {
    try {
      const usuarioInstance = new Usuario();
      const usuario = await usuarioInstance.getById(id);
      // Validamos si no hay usuarios
      if (usuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Usuario obtenido correctamente",
        data: usuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el usuario",
      };
    }
  }

  static async createUsuario(cedula, nombre, telefono, correo, idRol) {
    try {
      // Se instancia la clase usuario para poder acceder a sus metodos.
      const usuarioInstance = new Usuario();
      // Se instancia la clase rol para poder acceder a sus metodos.
      const rolInstance = new Rol();

      // Se busca un usuario por la cedula ingresada
      const usuarioCedulaExiste = await usuarioInstance.getByCedula(cedula);
      // Validamos si existe el usuario con esa cedula
      if (usuarioCedulaExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "La cedula ingresada ya está registrada",
        };
      }

      // Se busca un usuario por el correo ingresada
      const usuarioCorreoExiste = await usuarioInstance.getByEmail(correo);
      // Validamos si existe el usuario con ese correo
      if (usuarioCorreoExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "El correo ingresado ya está registrado",
        };
      }

      // Se busca un rol por el id dle rol ingresado
      const rolExiste = await rolInstance.getById(idRol);
      // Validamos si existe el rol con ese ID
      if (rolExiste.length === 0) {
        return {
          error: true,
          code: 400,
          message: "El ID de rol ingresado no existe",
        };
      }

      // Se creara la contraseña encriptada que en este caso seria el número de cedula ingresada por el usuario.
      const contrasena = await bcrypt.hash(cedula, 10);
      // 10 = número de "salt rounds", mientras más grande, más seguro pero más lento

      // Se intenta crear el usuario
      const usuario = await usuarioInstance.create(cedula, nombre, telefono, correo, contrasena, idRol);
      // Validamos si no se pudo crear el usuario
      if (usuario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el usuario",
        };
      }
      // Retornamos el nuevo usuario creado
      return {
        error: false,
        code: 201,
        message: "usuario creado correctamente",
        data: usuario,
      };

    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el usuario" + error, 
      };
    }
  }

  static async updateUsuario(id, cedula, nombre, telefono, correo, idRol) {
    try {
      const usuarioInstance = new Usuario();
      // Se instancia la clase rol para poder acceder a sus metodos.
      const rolInstance = new Rol();

      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "usuario no encontrado",
        };
      }

      // Se busca un usuario por la cedula ingresada
      const usuarioCedulaExiste = await usuarioInstance.getByCedula(cedula);
      
      // Validamos si existe el usuario con esa cedula
      if (usuarioCedulaExiste.length != 0 && cedula != usuarioExistente.cedula) {
        return {
          error: true,
          code: 400,
          message: "La cedula ingresada ya está registrada",
        };
      }

      // Se busca un usuario por el correo ingresada
      const usuarioCorreoExiste = await usuarioInstance.getByEmail(correo);
      // Validamos si existe el usuario con ese correo
      if (usuarioCorreoExiste.length != 0 && correo.trim() != usuarioExistente.correo) {
        return {
          error: true,
          code: 400,
          message: "El correo ingresado pertenece a otro usuario",
        };
      }

      // Se busca un rol por el id dle rol ingresado
      const rolExiste = await rolInstance.getById(idRol);
      // Validamos si existe el rol con ese ID
      if (rolExiste.length === 0) {
        return {
          error: true,
          code: 400,
          message: "El ID de rol ingresado no existe",
        };
      }

      // Se intenta actualizar el usuario
      const usuario = await usuarioInstance.update(id, cedula, nombre, telefono, correo, idRol);
      // Validamos si no se pudo actualizar el usuario
      if (usuario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el usuario",
        };
      }
      // Retornamos el usuario actualizada
      return {
        error: false,
        code: 200,
        message: "Usuario actualizado correctamente",
        data: usuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el usuario" + error,
      };
    }
  }

  static async updatePasswordUsuario(id, contrasena) {
    try {
      const usuarioInstance = new Usuario();

      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "usuario no encontrado",
        };
      }

      // Se intenta actualizar la contrasena del usuario
      const usuario = await usuarioInstance.updatePassword(id, contrasena);
      // Validamos si no se pudo actualizar la contraseña
      if (usuario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la contraseña",
        };
      }
      // Retornamos el usuario actualizada
      return {
        error: false,
        code: 200,
        message: "Contraseña actualizada correctamente",
        data: usuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la contraseña" + error,
      };
    }
  }

  static async deleteUsuario(id) {
    try {
      const usuarioInstance = new Usuario();
      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }

      // // Instancio la clase del modelo que se necesita.
      // const permisousuarioInstance = new PermisoUsuario();
      // // Consultamos los usuarios asociados al permiso en la tabla relacional
      // const usuarioHasPermisos = await permisousuarioInstance.getByusuarioId(id);
      // // Validamos si el usuario tiene permisos asignados
      // if (usuarioHasPermisos.length > 0) {
      //   return {
      //     error: true,
      //     code: 400,
      //     message: "No se puede eliminar el usuario debido a que tiene permisos asignados.",
      //   };
      // }

      // Procedemos a eliminar el usuario
      const resultado = await usuarioInstance.delete(id);
      // Validamos si no se pudo eliminar el usuario
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Usuario eliminado correctamente",
        data: usuarioExistente,
      };
    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el usuario",
      };
    }
  }

}

export default UsuarioService;