import connection from "../utils/db.js";

class Permiso {
  // Método para obtener una permiso por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos WHERE nombre_permiso = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el permiso
        return [];
      }
      // Retorna el permiso encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el rol");
    }
  }

}

export default Permiso;