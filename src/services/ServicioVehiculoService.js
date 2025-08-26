import ServicioVehiculo from "../models/ServicioVehiculo.js";
import Vehiculo from "../models/Vehiculo.js";

class ServicioVehiculoService {

  static async getServiciosVehiculos() {
    try {
      const servicioVehInstance = new ServicioVehiculo();
      const serviciosVehiculos = await servicioVehInstance.getAll();
      // Validamos si no hay servicios de vehiculos
      if (serviciosVehiculos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay servicios de vehiculos registrados",
        };
      }
      // Retornamos los servicios de vehiculos obtenidos
      return {
        error: false,
        code: 200,
        message: "Servicios de vehiculos obtenidos correctamente",
        data: serviciosVehiculos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los servicios de vehiculos",
      };
    }
  }

  static async getServicioVehiculoById(id) {
    try {
      const servicioVehInstance = new ServicioVehiculo();
      const servicioVehiculo = await servicioVehInstance.getById(id);
      // Validamos si no hay servicios de vehiculos
      if (servicioVehiculo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Servicio de vehiculo no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Servicio de vehiculo obtenido correctamente",
        data: servicioVehiculo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el Servicio de vehiculo",
      };
    }
  }

  static async createServicioVehiculo(nombre, porcentajeDesc) {
    try {
      // Se instancia la clase servicioVehiculo para poder acceder a sus metodos.
      const servicioVehInstance = new ServicioVehiculo();

      // Se buscar un servicio de vehiculo por el nombre ingresado
      const ServicioVehNameExiste = await servicioVehInstance.getByName(nombre.trim());
      // Validamos si existe el Servicio de vehiculo con ese nombre
      if (ServicioVehNameExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "El nombre del servicio de vehiculo ingresado ya está en uso",
        };
      }

      // Se intenta crear el Servicio de vehiculo
      const servicioVehiculo = await servicioVehInstance.create(nombre.trim(), porcentajeDesc);
      // Validamos si no se pudo crear el Servicio de vehiculo
      if (servicioVehiculo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el Servicio de vehiculo",
        };
      }
      // Retornamos el nuevo permiso creado
      return {
        error: false,
        code: 201,
        message: "Servicio de vehiculo creado correctamente",
        data: servicioVehiculo,
      };

    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el servicio",
      };
    }
  }

  static async updateServicioVehiculo(id, campos) {
    try {
      const servicioVehInstance = new ServicioVehiculo();

      const { nombre_servicio, porcentaje_descuento } = campos


      // Consultamos el Servicio de vehiculo por id
      const ServicioVehExistente = await servicioVehInstance.getById(id);
      // Validamos si no existe el Servicio de vehiculo
      if (ServicioVehExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Servicio de vehiculo no encontrado",
        };
      }

      // Se buscar un permiso por el nombre ingresado
      const ServicioVehNameExiste = await servicioVehInstance.getByName(nombre_servicio.trim());
      // Validamos si existe el Servicio de vehiculo con ese nombre
      if (ServicioVehNameExiste.length != 0 && nombre_servicio.trim() != ServicioVehExistente.nombre_servicio) {
        return {
          error: true,
          code: 400,
          message: "El nombre del servicio de vehiculo ingresado ya está en uso",
        };
      }

      // Se intenta actualizar el Servicio de vehiculo
      const servicioVehiculo = await servicioVehInstance.update(id, campos);
      // Validamos si no se pudo actualizar el Servicio de vehiculo
      if (servicioVehiculo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el servicio de vehiculo",
        };
      }
      // Retornamos el Servicio de vehiculo actualizado
      return {
        error: false,
        code: 200,
        message: "Servicio de vehiculo actualizado correctamente",
        data: servicioVehiculo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el Servicio de vehiculo",
      };
    }
  }

  static async deleteServicioVehiculo(id) {
    try {
      const servicioVehInstance = new ServicioVehiculo();
      // Consultamos el Servicio de vehiculo por id
      const ServicioVehExistente = await servicioVehInstance.getById(id);
      // Validamos si no existe el Servicio de vehiculo
      if (ServicioVehExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Servicio de vehiculo no encontrado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const vehiculoInstance = new Vehiculo();
      // Consultamos los vehiculos con el id del servicio a eliminar
      const vehiculoWithServicio = await vehiculoInstance.getByIdServicioVeh(id);

      // Validamos si el servicio está relacionado con algun vehiculo
      if (vehiculoWithServicio.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el servicio debido a que está asociados a uno o más vehiculos.",
        };
      }

      // Procedemos a eliminar el Servicio de vehiculo
      const resultado = await servicioVehInstance.delete(id);
      // Validamos si no se pudo eliminar el servicio de vehiculo
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Servicio de vehiculo eliminado correctamente",
        data: ServicioVehExistente,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el Servicio de vehiculo" + error,
      };
    }
  }
}

export default ServicioVehiculoService;