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


  // Método para obtener un vehiculo por su placa
  async getDescuentoById(id) {
    try {
      const [rows] = await connection.query(
        `SELECT V.id AS id_vehiculo, v.placa, SV.porcentaje_descuento
        FROM vehiculos V
        INNER JOIN servicios_vehiculos SV ON V.id_servicio_vehiculo = SV.id
        WHERE V.id = ?`, [id]);
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

  // Método para obtener un vehiculo por el id de su servicio
  async getByIdServicioVeh(idServicioVeh) {
    try {
      const [rows] = await connection.query("SELECT * FROM vehiculos WHERE id_servicio_vehiculo = ?", [idServicioVeh]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el vehiculo
        return [];
      }
      // Retorna el vehiculo encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el vehiculo");
    }
  }

  // Método para obtener un vehiculo por el id de su tipo
  async getByIdTipoVeh(idTipoVeh) {
    try {
      const [rows] = await connection.query("SELECT * FROM vehiculos WHERE id_tipo_vehiculo = ?", [idTipoVeh]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el vehiculo
        return [];
      }
      // Retorna el vehiculo encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el vehiculo");
    }
  }

}

export default Vehiculo;