import connection from "../utils/db.js";

class TipoLavado {

  // Método para obtener un registro de relación por el id de vehiculo
  async getByIdTipoVehiculo(idTipoVehiculo) {
    try {
      const [rows] = await connection.query("SELECT * FROM vehiculos_usuarios WHERE id_tipo_vehiculo = ?", [idTipoVehiculo]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los tipos de lavados");
    }
  }

}

export default TipoLavado;