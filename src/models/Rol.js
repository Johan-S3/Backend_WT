import connection from "../utils/db.js";

class Rol {
  // Método para obtener una rol por su nombre
  async getRolesPermitidos() {
    try {
      const [rows] = await connection.query("SELECT * FROM roles WHERE id IN (2,3)");
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran roles
        return [];
      }
      // Retorna los roles encontrados
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los roles");
    }
  }

  // Método para obtener una rol por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM roles WHERE nombre_rol = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el rol
        return [];
      }
      // Retorna el rol encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el rol");
    }
  }
}

export default Rol;