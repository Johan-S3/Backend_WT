import connection from "../utils/db.js";

class TipoVehiculo {
  // Método para obtener un tipo de vehiculo por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM tipos_vehiculos WHERE nombre_tipo = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el tipo de vehiculo
        return [];
      }
      // Retorna el tipo de vehiculo encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el tipo de vehiculo");
    }
  }

}

export default TipoVehiculo;