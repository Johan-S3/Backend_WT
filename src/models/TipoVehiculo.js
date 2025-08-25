import connection from "../utils/db.js";

class TipoVehiculo {
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los tipos de vehiculos en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM tipos_vehiculos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vehiculos");
    }
  }

  // Método para obtener un tipo de vehiculo por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM tipos_vehiculos WHERE id_tipo_vehiculo = ?", [id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el tipo de vehiculo
        return [];
      }
      // Retorna el tipo de vehiculo encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el tipo de vehiculo");
    }
  }

  // Método para obtener un tipo de vehiculo por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM tipos_vehiculos WHERE nombre_tipo = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el tipo de vehiculo
        return [];
      }
      // Retorna el tipo de vehiculo encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el tipo de vehiculo");
    }
  }

  // Metodo para crear un tipo de vehiculo pasandole los campos requeridos
  async create(nombre) {
    try {
      const [result] = await connection.query("INSERT INTO tipos_vehiculos (nombre_tipo) VALUES (?)", [nombre]);
      return { id: result.id_rol, nombre};
    } catch (error) {
      throw new Error("Error al crear el tipo de vehiculo");
    }
  }

  // Metodo para actualizar un tipo de vehiculo pasandole el id y los campos.
  async update(id, campos) {
    try {
      let query = "UPDATE tipos_vehiculos SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id_tipo_vehiculo = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de vehiculo");
    }
  }

  // Método para eliminar un tipo de vehiculo pasando el id a eliminar
  async delete(tipoVehiculoId) {
    const [result] = await connection.query("DELETE FROM tipos_vehiculos WHERE id_tipo_vehiculo = ?", [tipoVehiculoId]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el tipo de vehiculo, ocurrio un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Tipo de vehiculo eliminado exitosamente.",
    };
  }

}

export default TipoVehiculo;