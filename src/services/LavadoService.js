import CRUD from "../models/CRUD.js";
import Factura from "../models/Factura.js";
import Lavado from "../models/Lavado.js";

class LavadoService {

  static async getLavados() {
    try {
      const CRUDInstance = new CRUD();
      const lavados = await CRUDInstance.getAll("lavados", "los lavados");
      // Validamos si no hay lavados
      if (lavados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay lavados registrados",
        };
      }
      // Retornamos los lavados obtenidos
      return {
        error: false,
        code: 200,
        message: "Lavados obtenidos correctamente",
        data: lavados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los lavados",
      };
    }
  }

  static async getLavadosPendientes() {
    try {
      const lavadoInstance = new Lavado();
      const lavados = await lavadoInstance.getLavadosPendientes();
      // Validamos si no hay lavados
      if (lavados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay lavados pendientes registrados",
        };
      }
      // Retornamos los lavados obtenidos
      return {
        error: false,
        code: 200,
        message: "Lavados obtenidos correctamente",
        data: lavados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los lavados",
      };
    }
  }

  static async getLavadosEnProceso() {
    try {
      const lavadoInstance = new Lavado();
      const lavados = await lavadoInstance.getLavadosEnProceso();
      // Validamos si no hay lavados
      if (lavados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay lavados pendientes registrados",
        };
      }
      // Retornamos los lavados obtenidos
      return {
        error: false,
        code: 200,
        message: "Lavados obtenidos correctamente",
        data: lavados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los lavados",
      };
    }
  }

  static async getLavadoPendienteById(id) {
    try {
      const lavadoInstance = new Lavado();
      const lavado = await lavadoInstance.getLavadoPendienteById(id);
      // Validamos si no hay un lavado con ese ID
      if (lavado.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Lavado no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Lavado obtenido correctamente",
        data: lavado[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el lavado",
      };
    }
  }

  static async getLavadoEnProcesoById(id) {
    try {
      const lavadoInstance = new Lavado();
      const lavado = await lavadoInstance.getLavadoEnProcesoById(id);
      // Validamos si no hay un lavado con ese ID
      if (lavado.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Lavado no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Lavado obtenido correctamente",
        data: lavado[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el lavado",
      };
    }
  }

  static async getLavadoById(id) {
    try {
      const CRUDInstance = new CRUD();
      const lavado = await CRUDInstance.getByID("lavados", id, "el lavado");
      // Validamos si no hay un lavado con ese ID
      if (lavado.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Lavado no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Lavado obtenido correctamente",
        data: lavado[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el lavado",
      };
    }
  }

  static async createLavado(campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Destructuro el objeto campos para obtener los datos a consultar
      let { id_vehiculo, id_conductor, id_estado } = campos;

      // Se busca un vehiculo por el ID ingresado
      const vehiculoExiste = await CRUDInstance.getByID("vehiculos", id_vehiculo, "el vehiculo");
      // Validamos si no existe el vehiculo con ese ID
      if (vehiculoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El vehiculo ingresado no existe",
        };
      }

      // // Se busca un tipo de lavado por el ID ingresado
      // const tipoLavadoExiste = await CRUDInstance.getByID("tipos_lavados", id_tipo_lavado, "el tipo de lavado");
      // // Validamos si no existe el tipo de lavado con ese ID
      // if (tipoLavadoExiste.length == 0) {
      //   return {
      //     error: true,
      //     code: 400,
      //     message: "El tipo de lavado ingresado no existe",
      //   };
      // }

      // Se busca un usuario por el ID ingresado
      const usuarioExiste = await CRUDInstance.getByID("usuarios", id_conductor, "el usuario");
      // Validamos si no existe el usuario con ese ID
      if (usuarioExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El usuario ingresado no existe",
        };
      }

      // Se busca un estado por el ID ingresado
      const estadoExiste = await CRUDInstance.getByID("estados", id_estado, "el estado");
      // Validamos si no existe el estado con ese ID
      if (estadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El estado ingresado no existe",
        };
      }

      // Se intenta crear el lavado
      const lavado = await CRUDInstance.create("lavados", campos, "el lavado");
      // Validamos si no se pudo crear el lavado
      if (lavado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el lavado",
        };
      }
      // Retornamos el nuevo lavado
      return {
        error: false,
        code: 201,
        message: "Lavado creado correctamente",
        data: lavado,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el lavado",
      };
    }
  }

  static async updateLavado(id, campos) {
    try {
      // Se instancia la clase CRUD para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();

      // Se busca el lavado por el ID ingresado
      const lavadoExiste = await CRUDInstance.getByID("lavados", id, "el lavado");
      // Validamos si no existe el lavado con ese ID
      if (lavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Lavado no encontrado",
        };
      }

      // Destructuro el objeto campos para obtener los datos a consultar
      let { id_vehiculo, id_tipo_lavado, id_conductor, id_lavador, id_estado } = campos;

      // Se busca un vehiculo por el ID ingresado
      const vehiculoExiste = await CRUDInstance.getByID("vehiculos", id_vehiculo, "el vehiculo");
      // Validamos si no existe el vehiculo con ese ID
      if (vehiculoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El vehiculo ingresado no existe",
        };
      }

      // Se busca un tipo de lavado por el ID ingresado
      const tipoLavadoExiste = await CRUDInstance.getByID("tipos_lavados", id_tipo_lavado, "el tipo de lavado");
      // Validamos si no existe el tipo de lavado con ese ID
      if (tipoLavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El tipo de lavado ingresado no existe",
        };
      }

      // Se busca un conductor por el ID ingresado
      const conductorExiste = await CRUDInstance.getByID("usuarios", id_conductor, "el usuario");
      // Validamos si no existe el conductor con ese ID
      if (conductorExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El conductor ingresado no existe",
        };
      }

      // Se busca un lavador por el ID ingresado
      const lavadorExiste = await CRUDInstance.getByID("usuarios", id_lavador, "el usuario");
      // Validamos si no existe el lavador con ese ID
      if (lavadorExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El lavador ingresado no existe",
        };
      }

      // Se busca un estado por el ID ingresado
      const estadoExiste = await CRUDInstance.getByID("estados", id_estado, "el estado");
      // Validamos si no existe el estado con ese ID
      if (estadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El estado ingresado no existe",
        };
      }

      // Se intenta actualizar el lavado
      const lavado = await CRUDInstance.update("lavados", id, campos, "el lavado");
      // Validamos si no se pudo actualizar el lavado
      if (lavado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el lavado",
        };
      }
      // Retornamos el lavado actualizado
      return {
        error: false,
        code: 200,
        message: "Lavado actualizado correctamente",
        data: lavado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el lavado",
      };
    }
  }

  static async deleteLavado(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se busca el lavado por el ID ingresado
      const lavadoExiste = await CRUDInstance.getByID("lavados", id, "el lavado");
      // Validamos si no existe el lavado con ese ID
      if (lavadoExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "Lavado no encontrado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const facturaInstance = new Factura();
      // Consultamos una factura por el ID del lavado
      const lavadoWithFactura = await facturaInstance.getByIdLavado(id);
      // Validamos si existe una factura con el Id de del lavado ingresado
      if (lavadoWithFactura.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el lavado porque está asociado a una factura",
        };
      }

      // Procedemos a eliminar el lavado
      const resultado = await CRUDInstance.delete("lavados", id, "el lavado");
      // Validamos si no se pudo eliminar el lavado
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "El lavado no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Lavado eliminado correctamente"
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el lavado",
      };
    }
  }
}

export default LavadoService;