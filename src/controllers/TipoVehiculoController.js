import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoVehiculoService from "../services/TipoVehiculoService.js";

class TipoVehiculoController {

  // Obtener todos los tipos de vehiculos
  static getAllTiposVehiculos = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los tipos de vehiculo
      const response = await TipoVehiculoService.getTiposVehiculos();
      // Validamos si no hay tipos de vehiculos
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

  // Obtener un tipo de vehiculo por su ID
  static getTipoVehById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipo de vehiculo por su ID
      const response = await TipoVehiculoService.getTipoVehiculoById(id);
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

  // Crear un nuevo tipo de vehiculo
  static createTipoVeh = async (req, res) => {
    const campos = req.body;
    try {
      const response = await TipoVehiculoService.createTipoVehiculo(campos);
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

  // Actualizar un tipo de vehiculo
  static updateTipoVeh = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase TipoVehiculo
      const tipoVehiculo = await TipoVehiculoService.updateTipoVehiculo(id, campos);
      // Validamos si no se pudo actualizar la categoría
      if (tipoVehiculo.error) {
        ResponseProvider.error(
          res,
          tipoVehiculo.message,
          tipoVehiculo.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        tipoVehiculo.data,
        tipoVehiculo.message,
        tipoVehiculo.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor" + error, 500);
    }
  };

  // Eliminar un tipo de vehiculo
  static deleteTipoVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la categoría
      const response = await TipoVehiculoService.deleteTipoVehiculo(id);
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
      ResponseProvider.error(res, "Error interno en el servidor" , 500);
    }
  };

}
export default TipoVehiculoController;