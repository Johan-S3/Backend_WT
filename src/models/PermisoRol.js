import connection from "../utils/db.js";

class PermisoRol {
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

  // Método para obtener una permiso_rol por su el id del permiso
  async getByPermisoId(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM permisos_roles WHERE id_permiso = ?", [id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el permiso_rol
        return [];
      }
      // Retorna los registros donde se encuentra ese id del permiso
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los permisos_roles");
    }
  }

}

export default PermisoRol;