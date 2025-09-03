import connection from "../utils/db.js";

class ItemTipoLavado {

  // Método para obtener los items - tipos de lavados registrados
  async getItemsTiposLavados() {
    try {
      const [rows] = await connection.query(
        `SELECT TL.id AS "tipo_lavado_id", TL.nombre AS "nombre_tipo", COUNT(ITL.id_item_lavado) AS "cantidad_items", SUM(IL.valor) AS "total"
        FROM items_tipos_lavados ITL
        INNER JOIN tipos_lavados TL ON ITL.id_tipo_lavado = TL.id
        INNER JOIN items_lavados IL ON ITL.id_item_lavado = IL.id
        GROUP BY TL.id, TL.nombre`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los items-tipos de lavados");
    }
  }

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

  // Metodo para eliminar las relaciones de items con tipos de lavados por el ID del tipo de lavado
  async deleteByIdTipoLavado(id) {
    try {
      const [result] = await connection.query(
        `DELETE FROM items_tipos_lavados WHERE id_tipo_lavado = ?`,[id]
      );

      // Si no se eliminó ninguna fila (es decir, no se encontró un registro con ese ID), devuelve false
      if (result.affectedRows === 0) return false;

      // Si se eliminó al menos una fila, devuelve true
      return true;
    } catch (error) {
      // Si ocurre algún error en el proceso, lanza un mensaje de error personalizado
      throw new Error(`Error al eliminar la relacion`);
    }
  }
}

export default ItemTipoLavado;