import connection from "../utils/db.js";

class DetalleFactura {

    // Método para obtener los detalles de la factura por el ID de la factura
    async getByIdFactura(idFactura) {
        try {
            const [rows] = await connection.query("SELECT * FROM detalle_factura WHERE id_factura = ?", [idFactura]);
            if (rows.length === 0) {
                // Retorna un array vacío si no se encuentra un registro por ese ID
                return [];
            }
            // Retorna el registro encontrado
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los detalles de la factura");
        }
    }

    // Método para obtener los detalles de la factura por el ID del item de lavado
    async getByIdItemLavado(idItemLavado) {
        try {
            const [rows] = await connection.query("SELECT * FROM detalle_factura WHERE id_item_lavado = ?", [idItemLavado]);
            if (rows.length === 0) {
                // Retorna un array vacío si no se encuentra un registro por ese ID
                return [];
            }
            // Retorna el registro encontrado
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los detalles de la factura");
        }
    }

}

export default DetalleFactura;