import connection from "../utils/db.js";

class ServicioVehiculo {
  // Método para obtener un servicio de vehiculo por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM servicios_vehiculos WHERE nombre_servicio = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el servicio de vehiculo
        return [];
      }
      // Retorna el servicio de vehiculo encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el servicio de vehiculo");
    }
  }

}

export default ServicioVehiculo;