import connection from "../utils/db.js";

class Lavado {

  // Método para obtener los lavados por el Id del vehiculo
  async getByIdVehiculo(idVehiculo) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_vehiculo = ?", [idVehiculo]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del tipo de lavado
  async getByIdTipoLavado(idTipoLavado) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_tipo_lavado = ?", [idTipoLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del usuario
  async getByIdUsuario(idUsuario) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_usuario = ?", [idUsuario]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del estado
  async getByIdEstado(idEstado) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_estado = ?", [idEstado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

}

export default Lavado;