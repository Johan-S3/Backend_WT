import connection from "../utils/db.js";

class ItemTipoLavado {

  // Método para obtener los registros de la relacion entre los items y los tipos de lavados por el Id del tipo de lavado
  async getByIdTipoLavado(idTipoLavado) {
    try {
      const [rows] = await connection.query("SELECT * FROM items_tipos_lavados WHERE id_tipo_lavado = ?", [idTipoLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el registro de la relación entré el tipo y item de lavado");
    }
  }

  // Método para obtener los registros de la relacion entre los items y los tipos de lavados por el Id del item de lavado
  async getByIdItemLavado(idItemLavado) {
    try {
      const [rows] = await connection.query("SELECT * FROM items_tipos_lavados WHERE id_item_lavado = ?", [idItemLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el registro de la relación entré el item y tipos de lavado");
    }
  }
}

export default ItemTipoLavado;