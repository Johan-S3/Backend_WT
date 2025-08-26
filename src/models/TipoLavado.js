import connection from "../utils/db.js";

class TipoLavado {

  // Método para obtener un registro de relación por el id de vehiculo
  async getByIdVehiculo(idVehiculo) {
    try {
      const [rows] = await connection.query("SELECT * FROM vehiculos_usuarios WHERE id_vehiculo = ?", [idVehiculo]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener la relación");
    }
  }

  // Método para obtener un vehiculo por el id de su tipo
  async getByIdUsuario(idUsuario) {
    try {
      const [rows] = await connection.query("SELECT * FROM vehiculos_usuarios WHERE id_usuario = ?", [idUsuario]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el registro por ese ID de usuario
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener la relación");
    }
  }

}

export default TipoLavado;