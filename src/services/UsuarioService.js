import CRUD from "../models/CRUD.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import VehiculoUsuario from "../models/VehiculoUsuario.js";
import Lavado from "../models/Lavado.js";

class UsuarioService {

  static async getUsuarios() {
    try {
      const usuarioInstance = new Usuario();
      const usuarios = await usuarioInstance.getUsuarios();
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

  static async getGerentes() {
    try {
      const usuarioInstance = new Usuario();
      const usuarios = await usuarioInstance.getUsuariosGerentes();
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

  static async getLavadores() {
    try {
      const usuarioInstance = new Usuario();
      const usuarios = await usuarioInstance.getUsuariosLavadores();
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
      const CRUDInstance = new CRUD();
      const usuario = await CRUDInstance.getByID("usuarios", id, "el usuario");
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

  static async createUsuario(campos) {
    try {
      // Se instancia la clase crud para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();
      // Se instancia la clase usuario para poder acceder a sus metodos.
      const usuarioInstance = new Usuario();

      // Destructuro el objeto campos para obtener los valores necesarios.
      const { cedula, correo, id_rol } = campos;

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
      const rolExiste = await CRUDInstance.getByID("roles", id_rol, "el rol");
      console.log(rolExiste);

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

      // Agrego la contraseña encriptada a los campos
      campos.contrasena = contrasena;

      // Se intenta crear el usuario
      const usuario = await CRUDInstance.create("usuarios", campos, "el usuario");
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
        message: "Usuario creado correctamente",
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

  static async updateUsuario(id, campos) {
    try {
      // Se instancia la clase crud para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();
      // Se instancia la clase usuario para poder acceder a sus metodos.
      const usuarioInstance = new Usuario();

      // Consultamos el usuario por id
      const usuarioExistente = await CRUDInstance.getByID("usuarios", id, "el usuario");
      console.log(usuarioExistente);

      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "usuario no encontrado",
        };
      }

      // Destructuro el objeto campos para obtener los valores necesarios.
      const { cedula, correo, id_rol } = campos;

      // Se busca un usuario por la cedula ingresada
      const usuarioCedulaExiste = await usuarioInstance.getByCedula(cedula);
      // Validamos si existe el usuario con esa cedula
      if (usuarioCedulaExiste.length != 0 && usuarioExistente[0].cedula != cedula) {
        return {
          error: true,
          code: 400,
          message: "La cedula ingresada ya está registrada",
        };
      }

      // Se busca un usuario por el correo ingresada
      const usuarioCorreoExiste = await usuarioInstance.getByEmail(correo);
      // Validamos si existe el usuario con ese correo
      if (usuarioCorreoExiste.length != 0 && usuarioExistente[0].correo != correo) {
        return {
          error: true,
          code: 400,
          message: "El correo ingresado ya está registrado",
        };
      }

      // Se busca un rol por el id dle rol ingresado
      const rolExiste = await CRUDInstance.getByID("roles", id_rol, "el rol");
      // Validamos si existe el rol con ese ID
      if (rolExiste.length === 0) {
        return {
          error: true,
          code: 400,
          message: "El ID de rol ingresado no existe",
        };
      }

      // Se intenta actualizar el usuario
      const usuario = await CRUDInstance.update("usuarios", id, campos, "el usuario");
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

  static async updateEstadoUsuario(id) {
    try {
      // Se instancia la clase crud para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();
      // Se instancia la clase usuario para poder acceder a sus metodos.
      const usuarioInstance = new Usuario();

      // Consultamos el usuario por id
      const usuarioExistente = await CRUDInstance.getByID("usuarios", id, "el usuario");
      console.log(usuarioExistente);

      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "usuario no encontrado",
        };
      }

      // Se intenta actualizar el estado del usuario
      const usuario = await usuarioInstance.putEstadoUsuario(id);
      // Validamos si no se pudo actualizar el usuario
      if (usuario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al inactivar el usuario",
        };
      }
      // Retornamos el usuario actualizada
      return {
        error: false,
        code: 200,
        message: "Usuario inactivado correctamente",
        data: usuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al inactivar el usuario" + error,
      };
    }
  }

  static async updatePasswordUsuario(id, campos) {
    try {
      // Se instancia la clase crud para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Consultamos el usuario por id
      const usuarioExistente = await CRUDInstance.getByID("usuarios", id, "el usuario");
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "usuario no encontrado",
        };
      }

      const { contrasena_actual, contrasena_nueva } = campos; 

      if (!await bcrypt.compare(contrasena_actual, usuarioExistente[0].contrasena)) {
        return {
          error: true,
          code: 401,
          message: "La contraseña actual es incorrecta"
        };
      }

      // Se creara la contraseña encriptada que en este caso seria la nueva contrseña asignada por el usuario.
      const contrasenaHash = await bcrypt.hash(contrasena_nueva, 10);
      // 10 = número de "salt rounds", mientras más grande, más seguro pero más lento

      // Se intenta actualizar la contrasena del usuario
      const usuario = await CRUDInstance.update("usuarios", id, { contrasena: contrasenaHash }, "la contraseña del usuario");
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
      // Se instancia la clase crud para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Consultamos el usuario por id
      const usuarioExistente = await CRUDInstance.getByID("usuarios", id, "el usuario");
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const vehiculoUsuarioInstance = new VehiculoUsuario();
      // Consultamos un registro en la tabla relacional por el ID del usuario
      const UsuarioWithVehiculo = await vehiculoUsuarioInstance.getByIdUsuario(id);
      // Validamos si existe un registro de usuario en la tabla relacional con el Id de usuario ingresado
      if (UsuarioWithVehiculo.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el usuario porque está asociado a uno o mas vehiculos",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const lavadoInstance = new Lavado();
      // Consultamos un lavado por el ID del usuario
      const usuarioWithLavado = await lavadoInstance.getByIdUsuario(id);
      // Validamos si existe un lavado con el Id de usuario ingresado
      if (usuarioWithLavado.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el usuario porque está asociado a un lavado",
        };
      }

      // Procedemos a eliminar el usuario
      const resultado = await CRUDInstance.delete("usuarios", id, "el usuario");
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
        message: "Usuario eliminado correctamente"
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