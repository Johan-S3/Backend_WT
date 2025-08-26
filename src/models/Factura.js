import connection from "../utils/db.js";

class Factura {

  // Método para obtener las Facturas por el Id del lavado
  async getByIdLavado(idLavado) {
    try {
      const [rows] = await connection.query("SELECT * FROM facturas WHERE id_lavado = ?", [idLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las facturas");
    }
  }

}

export default Factura;