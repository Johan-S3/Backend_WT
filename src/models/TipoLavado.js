import connection from "../utils/db.js";

class TipoLavado {

  // Método para obtener los tipos de lavados registrados
  async getTiposLavados() {
    try {
      const [rows] = await connection.query(
        `SELECT TL.id, TL.nombre, TL.descripcion, TV.nombre_tipo 
        FROM tipos_lavados TL
        INNER JOIN tipos_vehiculos TV
        ON TL.id_tipo_vehiculo = TV.id`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los items de lavados");
    }
  }

  // Método para obtener los tipos de lavados registrados
  async getTiposLavadosLibres() {
    try {
      const [rows] = await connection.query(
        `SELECT TL.id, TL.nombre, TL.descripcion, TL.id_tipo_vehiculo 
        FROM tipos_lavados TL
        LEFT JOIN items_tipos_lavados ITL ON TL.id = ITL.id_tipo_lavado
        WHERE ITL.id_tipo_lavado IS NULL`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los items de lavados");
    }
  }


  // Método para obtener un registro de relación por el id de tipo de vehiculo
  async getByIdTipoVehiculo(idTipoVehiculo) {
    try {
      const [rows] = await connection.query("SELECT * FROM tipos_lavados WHERE id_tipo_vehiculo = ?", [idTipoVehiculo]);
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