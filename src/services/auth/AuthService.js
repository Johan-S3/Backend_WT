import bcrypt from "bcrypt";
import { generarAccessToken, generarRefreshToken, verificarRefreshToken } from "../../utils/jwt.js";
import Usuario from "../../models/Usuario.js";
import CRUD from "../../models/CRUD.js";

class AuthService {
  static async login(cedula, contrasena) {
    try {
      const usuarioInstance = new Usuario();
      // Buscamos usuario por cédula
      const usuario = await usuarioInstance.getByCedula(cedula); // devuelve un arreglo

      //   Se valida si no existe un usuario con ese numero de cedula
      if (usuario.length == 0) {
        return {
          error: true,
          code: 401,
          message: "Credenciales inválidas"
        };
      }

      // Obtengo el objeto con los datos del usuario al consultar por cedulas
      const dataUser = usuario[0];

      // console.log(dataUser);


      // Instancio la clase crud para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      const [user] = await CRUDInstance.getByID("usuarios", dataUser.id, "el usuario");


      //   Se valida si el usuario no puede ingresar ya que tiene un rol el cual no tiene interaccion con el
      if (![1, 2, 3].includes(user.id_rol)) {
        return {
          error: true,
          code: 403,
          message: "Este usuario no puede acceder al sistema"
        };
      }

      //   Se valida si el usuario no está activo para ingresar
      if (user.activo === 0 || user.activo === false) {
        return {
          error: true,
          code: 403,
          message: "Usuario inactivo"
        };
      }

      // Validar contraseña según rol
      let contrasenaOk = false;

      if (user.id_rol == 1) {
        // Rol 1: contraseña en texto plano
        contrasenaOk = contrasena === user.contrasena;
      } else {
        // Roles con contraseña encriptada
        contrasenaOk = await bcrypt.compare(contrasena, user.contrasena);
      }

      if (!contrasenaOk) {
        return {
          error: true,
          code: 401,
          message: "Credenciales inválidas"
        };
      }

      const permisos = await usuarioInstance.getPermisosByIdUsuario(user.id)

      const accessToken = generarAccessToken(user);
      const refreshToken = generarRefreshToken(user);


      return {
        error: false,
        code: 200,
        message: "Autenticación exitosa",
        data: { dataUser, accessToken, refreshToken, permisos }
      };
    } catch (e) {
      return {
        error: true,
        code: 500,
        message: "Error en el servidor" + e
      };
    }
  }

  static async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        return {
          error: true,
          code: 401,
          message: "Refresh token requerido"
        };
      }

      // Se verifica el refresh token recibido
      const decoded = verificarRefreshToken(refreshToken);

      // Se genera un nuevo nuevo Token
      const accessToken = generarAccessToken({ id: decoded.id, cedula: decoded.cedula });

      // Se devuelve el resultado existo del refresh token con el mismo refreshtoken
      return {
        error: false,
        code: 200,
        message: "Token renovado",
        data: {
          accessToken,
          refreshToken
        }
      };
    } catch (error) {
      const msg = error.name === "TokenExpiredError" ? "Refresh token expirado" : "Refresh token inválido";
      return { error: true, code: 403, message: msg };
    }
  }

  static async logout() {
    return {
      error: false,
      code: 200,
      message: "Sesión cerrada con exito"
    };
  }
}

export default AuthService;
