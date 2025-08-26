import CRUD from "../models/CRUD.js";
import ServicioVehiculo from "../models/ServicioVehiculo.js";
import TipoVehiculo from "../models/TipoVehiculo.js";
import Vehiculo from "../models/Vehiculo.js";
import VehiculoUsuario from "../models/VehiculoUsuario.js";

class VehiculoService {

  static async getVehiculos() {
    try {
      const CRUDInstance = new CRUD();
      const vehiculos = await CRUDInstance.getAll("vehiculos", "los vehiculos");
      // Validamos si no hay vehiculos
      if (vehiculos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay vehiculos registrados",
        };
      }
      // Retornamos los vehiculos obtenidos
      return {
        error: false,
        code: 200,
        message: "Vehiculos obtenidos correctamente",
        data: vehiculos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los vehiculos",
      };
    }
  }

  static async getVehiculoById(id) {
    try {
      const CRUDInstance = new CRUD();
      const vehiculo = await CRUDInstance.getByID("vehiculos", id, "el vehiculo");
      // Validamos si no hay vehiculos
      if (vehiculo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Vehiculo no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Vehiculo obtenido correctamente",
        data: vehiculo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el vehiculo",
      };
    }
  }

  static async createvehiculo(campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();
      const vehiculoInstance = new Vehiculo();
      const tipoVehInstance = new TipoVehiculo();
      const servicioVehInstance = new ServicioVehiculo();

      let { placa, id_tipo_vehiculo, id_servicio_vehiculo } = campos;

      // Se busca un Vehiculo por la placa ingresada
      const vehiculoPlacaExiste = await vehiculoInstance.getByPlaca(placa.trim());
      // Validamos si existe el vehiculo con esa placa
      if (vehiculoPlacaExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "La placa ingresada pertenece a otro vehiculo",
        };
      }

      // Se busca el tipo de vehiculo ingresado por su Id
      const tipoVehExiste = await tipoVehInstance.getById(id_tipo_vehiculo);
      // Validamos si existe el tipo de vehiculo con es ID
      if (tipoVehExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El tipo de vehiculo ingresado no existe",
        };
      }

      // Se busca el servicio de vehiculo ingresado por su Id
      const servicioVehExiste = await servicioVehInstance.getById(id_servicio_vehiculo);
      // Validamos si existe el servicio de vehiculo con es ID
      if (servicioVehExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El servicio de vehiculo ingresado no existe",
        };
      }

      // Se intenta crear el vehiculo
      const vehiculo = await CRUDInstance.create("vehiculos", campos, "el vehiculo");
      // Validamos si no se pudo crear el vehiculo
      if (vehiculo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el vehiculo",
        };
      }
      // Retornamos el nuevo vehiculo creado
      return {
        error: false,
        code: 201,
        message: "Vehiculo creado correctamente",
        data: vehiculo,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el vehiculo",
      };
    }
  }

  static async updateVehiculo(id, campos) {
    try {
      // Se instancia la clase vehiculo para poder acceder a sus metodos.
      const CRUDInstance = new CRUD();
      const vehiculoInstance = new Vehiculo();
      const tipoVehInstance = new TipoVehiculo();
      const servicioVehInstance = new ServicioVehiculo();

      // Se buscar un Vehiculo por el ID ingresado
      const vehiculoIdExiste = await CRUDInstance.getByID("vehiculos", id, "el vehiculo");
      // Validamos si existe el vehiculo con ese ID
      if (vehiculoIdExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "No existe un vehiculo con el ID ingresado",
        };
      }

      let { placa, id_tipo_vehiculo, id_servicio_vehiculo } = campos;

      // Se busca un Vehiculo por la placa ingresada
      const vehiculoPlacaExiste = await vehiculoInstance.getByPlaca(placa.trim());
      // Validamos si existe el vehiculo con esa placa
      if (vehiculoPlacaExiste.length != 0 && vehiculoIdExiste.placa != placa.trim()) {
        return {
          error: true,
          code: 400,
          message: "La placa ingresada pertenece a otro vehiculo",
        };
      }

      // Se busca el tipo de vehiculo ingresado por su Id
      const tipoVehExiste = await tipoVehInstance.getById(id_tipo_vehiculo);
      // Validamos si existe el tipo de vehiculo con es ID
      if (tipoVehExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El tipo de vehiculo ingresado no existe",
        };
      }

      // Se busca el servicio de vehiculo ingresado por su Id
      const servicioVehExiste = await servicioVehInstance.getById(id_servicio_vehiculo);
      // Validamos si existe el servicio de vehiculo con es ID
      if (servicioVehExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "El servicio de vehiculo ingresado no existe",
        };
      }

      // Se intenta actualizar el Vehiculo
      const vehiculo = await CRUDInstance.update("vehiculos", id, campos, "el vehiculo");
      // Validamos si no se pudo actualizar el Vehiculo
      if (vehiculo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el vehiculo",
        };
      }
      // Retornamos el vehiculo actualizado
      return {
        error: false,
        code: 200,
        message: "Vehiculo actualizado correctamente",
        data: vehiculo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el vehiculo" + error,
      };
    }
  }

  static async deletevehiculo(id) {
    try {
      const CRUDInstance = new CRUD();

      // Se buscar un Vehiculo por el ID ingresado
      const vehiculoIdExiste = await CRUDInstance.getByID("vehiculos", id, "el vehiculo");
      // Validamos si existe el vehiculo con ese ID
      if (vehiculoIdExiste.length == 0) {
        return {
          error: true,
          code: 400,
          message: "No existe un vehiculo con el ID ingresado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const vehiculoUsuarioInstance = new VehiculoUsuario();
      // Consultamos un registro en la tabla relacional por el ID del vehiculo
      const vehiculoWithUsuario = await vehiculoUsuarioInstance.getByIdVehiculo(id);
      // Validamos si existe un registro de vehiculo en la tabla relacional con el Id de vehiculo ingresado
      if (vehiculoWithUsuario.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el vehiculo porque está asociado a un usuario",
        };
      }

      // Procedemos a eliminar el Vehiculo
      const resultado = await CRUDInstance.delete("vehiculos", id, "el vehiculo");
      // Validamos si no se pudo eliminar el Vehiculo
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "El vehiculo no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Vehiculo eliminado correctamente"
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el Vehiculo",
      };
    }
  }
}

export default VehiculoService;