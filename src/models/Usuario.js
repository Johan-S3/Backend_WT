import connection from "../utils/db.js";

class Usuario {
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

  // Método para eliminar un usuario pasando el id del usuario a eliminar
  async delete(usuarioId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [usuarioId]);

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