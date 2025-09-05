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

  // Método para obtener las Facturas con sus items
  async getFacturaItemsByIdFactura(idFactura) {
    try {
      const [rows] = await connection.query(
        `SELECT F.id AS factura_id, L.id AS lavado_id, V.placa AS vehiculo_placa,
        TV.nombre_tipo AS tipo_vehiculo,
        TL.nombre AS tipo_lavado,
        IL.id AS item_id, IL.nombre AS item_nombre, IL.valor AS item_valor
        FROM facturas F
        INNER JOIN lavados L ON F.id_lavado = L.id
        INNER JOIN vehiculos V ON L.id_vehiculo = V.id
        INNER JOIN tipos_vehiculos TV ON V.id_tipo_vehiculo = TV.id
        INNER JOIN tipos_lavados TL ON L.id_tipo_lavado = TL.id
        INNER JOIN items_tipos_lavados ITL ON TL.id = ITL.id_tipo_lavado
        INNER JOIN items_lavados IL ON ITL.id_item_lavado = IL.id
        WHERE F.id = ?`, [idFactura]);
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

  // Método para obtener las Facturas con sus items
  async getInfoFacturas() {
    try {
      const [rows] = await connection.query(
        `SELECT F.id AS factura_id, DATE_FORMAT(F.fecha, '%Y-%m-%d') AS fecha_factura, 
		    F.total AS total_factura,
        TL.nombre AS tipo_lavado, V.placa
        FROM facturas F
        INNER JOIN lavados L ON F.id_lavado = L.id
        INNER JOIN vehiculos V ON L.id_vehiculo = V.id
        INNER JOIN tipos_lavados TL ON L.id_tipo_lavado = TL.id
        WHERE DATE(F.fecha) = CURDATE() 
        order by F.id`);
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