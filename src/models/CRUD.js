import router from "../routes/rolesRoutes.js";
import connection from "../utils/db.js";

class CRUD {
  //Metodo para obtener todos los registros de una tabla
  async getAll(tabla, message) {
    try {
      //Obtenemos el resultado de la consulta
      const [rows] = await connection.query(`SELECT * FROM ${tabla};`);
      //Retornamos la respuesta al servicio
      return rows;
    } catch (error) {
      //
      throw new Error(`Error al obtener ${message}`);
    }
  }

  //Metodo para obtener el registro de una tabla por su identificador
  async getByID(tabla, id, message) {
    try {
      //Obtenemos el resultado de la consulta
      const [rows] = await connection.query(
        `select * from ${tabla} where id = ?`,
        [id]
      );
      //Retornamos la respuesta al servicio
      return rows[0];
    } catch (error) {
      // Lanza un error personalizado si la operación falla
      throw new Error(`Error al obtener ${message}`);
    }
  }

  // Metodo asincrónico para insertar un registro en una tabla específica
  async create(tabla, campos, message) {
    try {
      // Inicializa la parte de la consulta que define los nombres de las campos
      let query = `INSERT INTO ${tabla} (`;
      // Inicializa la parte de la consulta que define los valores a insertar
      let values = "VALUES (";
      // Arreglo para guardar los valores a insertar, que se usarán como parámetros en la consulta
      let params = [];

      // Itera sobre cada clave-valor del objeto 'campos'
      for (const [key, value] of Object.entries(campos)) {
        // Agrega el nombre del campo a la consulta
        query += `${key}, `;

        // Marca la posición de un valor usando el signo de interrogación (?)
        values += `?, `;

        // Agrega el valor correspondiente al arreglo de parámetros
        params.push(value);
      }

      // Elimina la última coma y espacio de la cadena de valores, y cierra los paréntesis
      values = values.slice(0, -2) + ")";

      // Elimina la última coma y espacio de la cadena de campos, y concatena la parte de los valores
      query = `${query.slice(0, -2)}) ${values};`;

      // Ejecuta la consulta con los parámetros usando el objeto 'connection'
      const [result] = await connection.query(query, params);

      // Devuelve el id insertado y los campos insertados como objeto
      return {
        id: result.insertId, // ID del nuevo registro insertado
        ...campos, // Campos que fueron insertados
      };
    } catch (error) {
      // Lanza un error personalizado si la operación falla
      console.log(error);

      throw new Error(`Error al crear ${message}` + error);
    }
  }

  // Metodo asincrónico para actualizar un registro en una tabla específica usando su ID
  async update(tabla, id, campos, message) {
    try {
      // Inicializa la consulta SQL de actualización
      let query = `UPDATE ${tabla} SET `;

      // Arreglo que contendrá los valores que reemplazarán los marcadores (?) en la consulta
      let params = [];

      // Recorre cada clave-valor del objeto 'campos' para construir dinámicamente los campos a actualizar
      for (const [key, value] of Object.entries(campos)) {
        // Agrega a la consulta la asignación de cada campo con un marcador de valor (?)
        query += `${key} = ?, `;

        // Agrega el valor correspondiente al arreglo de parámetros
        params.push(value);
      }

      // Elimina la última coma y espacio sobrantes, y agrega la cláusula WHERE para actualizar por ID
      query = `${query.slice(0, -2)} WHERE id = ?;`;

      // Agrega el ID al final del arreglo de parámetros para usarlo en la cláusula WHERE
      params.push(id);

      // Ejecuta la consulta SQL con los parámetros preparados
      const [result] = await connection.query(query, params);

      // Si se modificó al menos una fila, devuelve el objeto actualizado con su ID; de lo contrario, devuelve null
      return result.affectedRows > 0 ? { id: parseInt(id), ...campos } : null;
    } catch (error) {
      // Si ocurre un error durante la operación, lanza un mensaje de error personalizado
      throw new Error(`Error al actualizar ${message}`);
    }
  }

  // Metodo asincrónico para eliminar un registro por su ID de una tabla específica
  async delete(tabla, id, message) {
    try {
      // Ejecuta una consulta SQL para eliminar un registro en la tabla especificada donde el id coincida
      const [result] = await connection.query(
        `DELETE FROM ${tabla} WHERE id = ?`,
        [id]
      );

      // Si no se eliminó ninguna fila (es decir, no se encontró un registro con ese ID), devuelve false
      if (result.affectedRows === 0) return false;

      // Si se eliminó al menos una fila, devuelve true
      return true;
    } catch (error) {
      // Si ocurre algún error en el proceso, lanza un mensaje de error personalizado
      throw new Error(`Error al eliminar ${message}`);
    }
  }
}

// Exporta el objeto Crud como valor por defecto del módulo
export default CRUD;