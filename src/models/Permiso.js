import connection from "../utils/db.js";

class Permiso {
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los permisos en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los permisos");
    }
  }

  // Método para obtener una permiso por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos WHERE id = ?", [id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el permiso
        return [];
      }
      // Retorna el permiso encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el permiso");
    }
  }

  // Método para obtener una permiso por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos WHERE nombre_permiso = ?", [name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el permiso
        return [];
      }
      // Retorna el permiso encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el rol");
    }
  }

  // Metodo para crear un permiso pasandole los campos requeridos
  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query("INSERT INTO permisos (nombre_permiso, descripcion_permiso) VALUES (?, ?)", [nombre, descripcion]);
      return { id: result.id_rol, nombre, descripcion };
    } catch (error) {
      throw new Error("Error al crear el permiso" + error);
    }
  }

  // Metodo para actualizar un permiso pasandole el id del rol y los qcampos.
  async update(id, campos) {
    try {
      let query = "UPDATE permisos SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el permiso");
    }
  }

  // Método para eliminar un permiso pasando el id del permiso a eliminar
  async delete(permisoId) {
    const [result] = await connection.query("DELETE FROM permisos WHERE id = ?", [permisoId]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el permiso, ocurrio un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Permiso eliminado exitosamente.",
    };
  }

}

export default Permiso;