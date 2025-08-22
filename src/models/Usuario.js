import connection from "../utils/db.js";

class Usuario {
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los usuarios en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los usuarios");
    }
  }

  // Método para obtener un usuario por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
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

  // Método para obtener una usuario por su cedula
  async getByCedula(cedula) {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios WHERE cedula = ?", [cedula]);
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

  // Metodo para crear un usuario pasandole los campos
  async create(cedula, nombre, telefono, correo, contrasena, idRol) {
    try {
      const [result] = await connection.query("INSERT INTO usuarios (cedula, nombre, telefono, correo, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?)",
        [cedula, nombre, telefono, correo, contrasena, idRol]);
      return { id: result.id_usuario, cedula, nombre, telefono, correo, contrasena, idRol };
    } catch (error) {
      throw new Error("Error al crear el usuario" + error);
    }
  }

  // Metodo para actualizar un usuario pasandole el id del usuario y el campo "nombre" que se va a actualizar.
  async update(id, cedula, nombre, telefono, correo, idRol) {
    try {
      const [result] = await connection.query(`UPDATE usuario SET cedula = ?, nombre = ?, telefono = ?, correo = ?, id_rol = ? 
        WHERE id_usuario = ?`, [cedula, nombre, telefono, correo, idRol, id]);
      if (result.affectedRows === 0) {
        throw new Error("usuario no encontrado");
      }
      return { id, cedula, nombre, telefono, correo, idRol };

    } catch (error) {
      console.log(error.message);
      throw new Error("Error al actualizar el usuario" + error);
    }
  }

  // Método para eliminar un usuario pasando el id del usuario a eliminar
  async delete(usuarioId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM usuario WHERE id_usuario = ?", [usuarioId]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el usuario, ocurrio un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Usuario eliminado exitosamente.",
    };
  }

}

export default Usuario;