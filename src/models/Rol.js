import connection from "../utils/db.js";

class Rol{  
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los roles en un arreglo
   */
  async getAll(){
    try {
      const [rows] = await connection.query("SELECT * FROM roles");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los roles");
    }
  }

  // Método para obtener una rol por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM roles WHERE id_rol = ?",[id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el rol
        return [];
      }
      // Retorna el rol encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el rol");
    }
  }

  // Método para obtener una rol por su nombre
  async getByName(name) {
    try {
      const [rows] = await connection.query("SELECT * FROM roles WHERE nombre_rol = ?",[name]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el rol
        return [];
      }
      // Retorna el rol encontrado
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el rol");
    }
  }

  // Metodo para crear un rol pasandole el campo nombre
  async create(nombre) {
    try {            
      const [result] = await connection.query("INSERT INTO roles (nombre_rol) VALUES (?)", nombre);
      return {id: result.id_rol, nombre};
    } catch (error) {
      throw new Error("Error al crear el rol" + error);  
    }
  }

  // Metodo para actualizar un rol pasandole el id del rol y el campo "nombre" que se va a actualizar.
  async update(id, nombre) {
    try {
      const [result] = await connection.query(`UPDATE roles SET nombre_rol = ? WHERE id_rol = ?`, [nombre, id]);
      if(result.affectedRows === 0){
        throw new Error("Rol no encontrada"); 
      }
      return { id, nombre };

    } catch (error) {
      console.log(error.message);
      throw new Error("Error al actualizar el rol" + error);  
    }
  }

  // Método para eliminar un rol pasando el id del rol a eliminar
  async delete(rolId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM roles WHERE id_rol = ?",[rolId]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el rol, ocurrio un error inesperado.",
      };
    }
    return {
      error: false,
      mensaje: "Rol eliminado exitosamente.",
    };
  }

}

export default Rol;