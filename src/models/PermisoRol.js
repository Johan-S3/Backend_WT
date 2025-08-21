import connection from "../utils/db.js";

class PermisoRol {
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los los registros de la tabla permisos_roles en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos_roles");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los permisos_roles");
    }
  }

  // Método para obtener una permiso_rol por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos_roles WHERE id_permiso_rol = ?", [id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el permiso_rol
        return [];
      }
      // Retorna el permiso_rol encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el permiso_rol");
    }
  }

  // Método para obtener una permiso_rol por su el id del rol
  async getByRolId(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos_roles WHERE id_rol = ?", [id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el permiso_rol
        return [];
      }
      // Retorna los registros donde se encuentra ese id del rol
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los permisos_roles");
    }
  }

  // Metodo para crear un permiso_rol pasandole los campos requeridos
  async create(idRol, idPermiso) {
    try {
      const [result] = await connection.query("INSERT INTO permisos_roles (id_rol, id_permiso) VALUES (?, ?)", [idRol, idPermiso]);
      return { id_permiso_rol: result.id_rol, idRol, idPermiso };
    } catch (error) {
      throw new Error("Error al crear el permiso_rol" + error);
    }
  }

  // Metodo para actualizar un permiso_rol pasandole el id del permiso_rol y los campos.
  async update(id, campos) {
    try {
      let query = "UPDATE permisos_roles SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id_permiso_rol = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el permiso_rol");
    }
  }

  // Método para eliminar un permiso_rol pasando el id del permiso a eliminar
  async delete(permisoRolId) {
    const [result] = await connection.query("DELETE FROM permisos_roles WHERE id_permiso_rol = ?", [permisoRolId]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el permiso_Rol, ocurrio un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Permiso_rol eliminado exitosamente.",
    };
  }

}

export default PermisoRol;