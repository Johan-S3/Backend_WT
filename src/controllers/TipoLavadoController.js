import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoLavadoService from "../services/TipoLavadoService.js";

class TipoLavadoController {
  // Obtener todos los tipos de lavados
  static getAllTiposLavadosLibres = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await TipoLavadoService.getTiposLavadosLibres();
      // Validamos si hay errores en la respuesta de la peticion para mostrar
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

  // Obtener todos los tipos de lavados
  static getAllTiposLavados = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await TipoLavadoService.getAllTiposLavados();
      // Validamos si hay errores en la respuesta de la peticion para mostrar
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

  // Obtener todos los tipos de lavados relacionados con items
  static getAllTiposLavadosWithItems = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await TipoLavadoService.getTiposLavadosItems();
      // Validamos si hay errores en la respuesta de la peticion para mostrar
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

  // Obtener un tipo de lavado por su ID
  static getTipoLavadoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipoo de lavado por su ID
      const response = await TipoLavadoService.getTipoLavadoById(id);
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

  // Obtener el valor del tipo de lavado por el su id
  static getValorTipoLavadoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipoo de lavado por su ID
      const response = await TipoLavadoService.getValorTipoLavadoById(id);
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

  // Obtener tipos de lavados por el id del tipo de vehicul
  static getTiposLavadosByIdTipoVeh = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipoo de lavado por su ID
      const response = await TipoLavadoService.getTipoLavadoByIdTipoVeh(id);
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

  // Crear un tipo de lavado
  static createTipoLavado = async (req, res) => {
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      const response = await TipoLavadoService.createTipoLavado(campos);
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

  // Actualizar un tipo de lavado
  static updateTipoLavado = async (req, res) => {
    const { id } = req.params;
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      // Crear una instancia de la clase TipoLavadoService
      const response = await TipoLavadoService.updatetTipoLavado(id, campos);
      // Validamos si no se pudo actualizar la vehiculo
      if (response.error) {
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error interno en el servidor" + error, 500);
    }
  };

  // Eliminar un tipo de lavado
  static deleteTipoLavado = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el tipo de lavado
      const response = await TipoLavadoService.deletetipoLavado(id);
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
export default TipoLavadoController;