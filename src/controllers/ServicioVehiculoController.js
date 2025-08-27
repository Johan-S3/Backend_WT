import { ResponseProvider } from "../providers/ResponseProvider.js";
import ServicioVehiculoService from "../services/ServicioVehiculoService.js";

class servicioVehiculoController {
  // Obtener todos los servicios de vehiculos
  static getAllServiciosVehiculos = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los servicios de vehiculo
      const response = await ServicioVehiculoService.getServiciosVehiculos();
      // Validamos si no hay servicios de vehiculos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener un servicio de vehiculo por su ID
  static getServicioVehById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el servicio de vehiculo por su ID
      const response = await ServicioVehiculoService.getServicioVehiculoById(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo servicio de vehiculo
  static createServicioVeh = async (req, res) => {
    const campos = req.body;
    try {
      const response = await ServicioVehiculoService.createServicioVehiculo(campos);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un servicio de vehiculo
  static updateServicioVeh = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase servicioVehiculo
      const servicioVehiculo = await ServicioVehiculoService.updateServicioVehiculo(id, campos);
      // Validamos si no se pudo actualizar la categoría
      if (servicioVehiculo.error) {
        ResponseProvider.error(
          res,
          servicioVehiculo.message,
          servicioVehiculo.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        servicioVehiculo.data,
        servicioVehiculo.message,
        servicioVehiculo.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor" + error, 500);
    }
  };

  // Eliminar un servicio de vehiculo
  static deleteservicioVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la categoría
      const response = await ServicioVehiculoService.deleteServicioVehiculo(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          null,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

}
export default servicioVehiculoController;