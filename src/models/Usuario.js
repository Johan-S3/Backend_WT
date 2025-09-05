import connection from "../utils/db.js";

class Usuario {
  // Método para obtener los usuarios
  async getUsuarios() {
    try {
      const [rows] = await connection.query(
        `SELECT U.id, U.cedula, U.nombre, U.telefono, U.correo, EU.nombre_estado, R.nombre_rol 
        FROM usuarios u 
        INNER JOIN roles R on R.id = U.id_rol
        INNER JOIN estados_usuarios EU on EU.id = U.id_estado
        WHERE U.id != 1`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  // Método para obtener una usuario por su cedula
  async getUsuariosGerentes() {
    try {
      const [rows] = await connection.query(
        `SELECT U.id, U.cedula, U.nombre, U.telefono, U.correo, EU.nombre_estado, R.nombre_rol 
        FROM usuarios u 
        INNER JOIN roles R on R.id = U.id_rol
        INNER JOIN estados_usuarios EU on EU.id = U.id_estado
        WHERE U.id = 3`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }
  // Método para obtener una usuario lavadores
  async getUsuariosLavadores() {
    try {
      const [rows] = await connection.query(
        `SELECT U.id, U.cedula, U.nombre, U.telefono, U.correo, EU.nombre_estado, R.nombre_rol 
        FROM usuarios U 
        INNER JOIN roles R on R.id = U.id_rol
        INNER JOIN estados_usuarios EU on EU.id = U.id_estado
        WHERE R.id = 4`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  // Método para obtener una usuario lavadores activos
  async getUsuariosLavadoresActivos() {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM usuarios U
        WHERE U.id_rol = 4 AND U.id_estado = 1`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los usuarios");
    }
  }

  // Método para obtener una usuario por su cedula
  async getByCedula(cedula) {
    try {
      const [rows] = await connection.query(
        `SELECT U.id, U.cedula, U.nombre, U.telefono, U.correo, U.id_rol, U.id_estado, R.nombre_rol
        FROM usuarios u 
        INNER JOIN roles R on R.id = U.id_rol
        WHERE cedula = ?`, [cedula]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  // Método para obtener una usuario por su email o correo
  async getByEmail(email) {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios WHERE correo = ?", [email]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuario encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  // Método para obtener un usuario con sus permisos
  async getPermisosByIdUsuario(idUsuario) {
    try {
      const [rows] = await connection.query(
        `select p.nombre_permiso
        from usuarios u
        join roles r on u.id_rol = r.id
        join permisos_roles pr on r.id = pr.id_rol
        join permisos p on pr.id_permiso = p.id
        where u.id = ?;`, [idUsuario]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna un arreglo con los nombres de los permisos
      return rows.map(row => row.nombre_permiso); //Uso map para crear un arreglo transformado
    } catch (error) {
      throw new Error("Error al obtener los permisos del usuario");
    }
  }

  // Método para inactivar un usuario
  async putEstadoUsuario(idUsuario) {
    try {
      const [result] = await connection.query(
        `UPDATE usuarios SET id_estado = 2 WHERE id = ?;`, [idUsuario]);

        if(result.affectedRows == 0) return false;

        return true;
    } catch (error) {
      throw new Error("Error al cambiar el estado del usuario");
    }
  }

  // Método para activar un usuario
  async ActivarUsuario(idUsuario) {
    try {
      const [result] = await connection.query(
        `UPDATE usuarios SET id_estado = 1 WHERE id = ?;`, [idUsuario]);

        if(result.affectedRows == 0) return false;

        return true;
    } catch (error) {
      throw new Error("Error al activar el usuario");
    }
  }

}

export default Usuario;