import connection from "../utils/db.js";

class Vehiculo {
  // Método para obtener un vehiculo por su placa
  async getByPlaca(placa) {
    try {
      const [rows] = await connection.query("SELECT * FROM vehiculos WHERE placa = ?", [placa]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el vehiculo
        return [];
      }
      // Retorna el vehiculo encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el vehiculo");
    }
  }
}

export default Vehiculo;