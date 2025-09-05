import connection from "../utils/db.js";

class Lavado {

  // Método para obtener los lavados con el id de estado pendiente registrados
  async getLavadosPendientes() {
    try {
      const [rows] = await connection.query(
        `SELECT L.id, V.placa, TV.nombre_tipo, V.clave 
        FROM lavados L
        INNER JOIN vehiculos V ON L.id_vehiculo = V.id
        INNER JOIN tipos_Vehiculos TV ON V.id_tipo_vehiculo = TV.id
        WHERE L.id_estado = 1`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados pendientes");
    }
  }

  // Método para obtener los lavados con el id de estado pendiente registrados
  async getLavadosEnProceso() {
    try {
      const [rows] = await connection.query(
        `SELECT L.id, V.placa, TV.nombre_tipo, V.clave, U.nombre AS "nombre_lavador", L.id_lavador
        FROM lavados L
        INNER JOIN vehiculos V ON L.id_vehiculo = V.id
        INNER JOIN tipos_Vehiculos TV ON V.id_tipo_vehiculo = TV.id
        INNER JOIN usuarios U ON L.id_lavador = U.id
        WHERE L.id_estado = 2`);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados en proceso");
    }
  }

  // Método para obtener los lavados pendientes por el ID
  async getLavadoPendienteById(idLavado) {
    try {
      const [rows] = await connection.query(
        `SELECT V.placa, V.marca_vehiculo, V.modelo_vehiculo, v.clave, TV.nombre_tipo, V.id_tipo_vehiculo,
		    U.cedula, U.nombre, U.telefono, U.correo,
        L.id_vehiculo, L.id_conductor
        FROM lavados L
        INNER JOIN vehiculos V ON L.id_vehiculo = V.id
        INNER JOIN usuarios U ON L.id_conductor = U.id
        INNER JOIN tipos_Vehiculos TV ON V.id_tipo_vehiculo = TV.id
        WHERE L.id = ?`, [idLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados en proceso por el ID
  async getLavadoEnProcesoById(idLavado) {
    try {
      const [rows] = await connection.query(
        `SELECT V.placa, V.marca_vehiculo, v.clave, TV.nombre_tipo AS "tipo_vehiculo",
        C.cedula AS "cedula_conductor", C.nombre AS "nombre_conductor", c.telefono AS "telefono_conductor", 
        LA.nombre AS "nombre_lavador", TL.nombre AS "tipo_lavado"
        FROM lavados L
        INNER JOIN vehiculos V ON L.id_vehiculo = V.id
        INNER JOIN usuarios C ON L.id_conductor = C.id
        INNER JOIN tipos_Vehiculos TV ON V.id_tipo_vehiculo = TV.id
        INNER JOIN tipos_lavados TL ON L.id_tipo_lavado = TL.id
        INNER JOIN usuarios LA ON L.id_lavador = LA.id
        WHERE L.id = ?`, [idLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentran registros
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del vehiculo
  async getByIdVehiculo(idVehiculo) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_vehiculo = ?", [idVehiculo]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del tipo de lavado
  async getByIdTipoLavado(idTipoLavado) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_tipo_lavado = ?", [idTipoLavado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del usuario
  async getByIdConductor(idConductor) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_conductor = ?", [idConductor]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del usuario
  async getByIdLavador(idLavador) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_lavador = ?", [idLavador]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

  // Método para obtener los lavados por el Id del estado
  async getByIdEstado(idEstado) {
    try {
      const [rows] = await connection.query("SELECT * FROM lavados WHERE id_estado = ?", [idEstado]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra un registro por ese ID
        return [];
      }
      // Retorna el registro encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lavados");
    }
  }

}

export default Lavado;