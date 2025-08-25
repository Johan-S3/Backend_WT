import connection from "../utils/db.js";

class ServicioVehiculo {
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los servicios de vehiculo en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM servicios_vehiculos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los servicios de vehiculos");
    }
  }

  // Método para obtener un servicio de vehiculo por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM servicios_vehiculos WHERE id = ?", [id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el servicio de vehiculo
        return [];
      }
      // Retorna el servicio de vehiculo encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el servicio de vehiculo");
    }
  }

  // Método para obtener un servicio de vehiculo por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM servicios_vehiculos WHERE nombre_servicio = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el servicio de vehiculo
        return [];
      }
      // Retorna el servicio de vehiculo encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el servicio de vehiculo");
    }
  }

  // Metodo para crear un servicio de vehiculo pasandole los campos requeridos
  async create(nombre, porcentajeDesc) {
    try {
      let sql = "";
      let campos;
      if (porcentajeDesc) {
        sql = "INSERT INTO servicios_vehiculos(nombre_servicio, porcentaje_descuento) VALUES(?, ?)";
        campos = [nombre, porcentajeDesc];
      } else {
        sql = "INSERT INTO servicios_vehiculos (nombre_servicio) VALUES (?)"
        campos = [nombre];
      }
      const [result] = await connection.query(sql, campos);
      return { id: result.id_rol, nombre, porcentajeDesc };
    } catch (error) {
      throw new Error("Error al crear el servicio de vehiculo" + error);
    }
  }

  // Metodo para actualizar un servicio de vehiculo pasandole el id y los campos.
  async update(id, campos) {
    try {
      let query = "UPDATE servicios_vehiculos SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el servicio por su ID
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el servicio de vehiculo");
    }
  }

  // Método para eliminar un servicio de vehiculo pasando el id a eliminar
  async delete(ServicioVehiculoId) {
    const [result] = await connection.query("DELETE FROM servicios_vehiculos WHERE id = ?", [ServicioVehiculoId]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el servicio de vehiculo, ocurrio un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Servicio de vehiculo eliminado exitosamente.",
    };
  }

}

export default ServicioVehiculo;