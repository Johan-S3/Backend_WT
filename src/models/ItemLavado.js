import connection from "../utils/db.js";

class ItemLavado {

  // Método para obtener los itemsLavados por el Id del tipo de vehiculo
  async getByIdTipoVehiculo(idTipoVehiculo) {
    try {
      const [rows] = await connection.query("SELECT * FROM items_lavados WHERE id_tipo_vehiculo = ?", [idTipoVehiculo]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los items de lavados");
    }
  }
}

export default ItemLavado;