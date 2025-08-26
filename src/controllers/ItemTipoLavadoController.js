import { ResponseProvider } from "../providers/ResponseProvider.js";
import ItemTipoLavadoService from "../services/ItemTipoLavadoService.js";

class ItemTipoLavadoController {
  // Obtener todos los tipos de lavados
  static getAllItemsTiposLavados = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await ItemTipoLavadoService.getItemsTiposLavados();
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

  // Obtener la relacion entre item y tipo de lavado por su ID
  static getItemTipoLavadoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el item de lavado por su ID
      const response = await ItemTipoLavadoService.getItemTipoLavadoById(id);
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

  // Crear un item de lavado
  static createItemTipoLavado = async (req, res) => {
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      const response = await ItemTipoLavadoService.createItemTipoLavado(campos);
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

  // Actualizar un item de lavado
  static updateItemTipoLavado = async (req, res) => {
    const { id } = req.params;
    //Obtiene el cuerpo de la solicitud HTTP, los campos de la tabla
    const campos = req.body;

    try {
      // Crear una instancia de la clase ItemTipoLavadoService
      const response = await ItemTipoLavadoService.updatetItemTipoLavado(id, campos);
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

  // Eliminar un item de lavado
  static deleteItemTipoLavado = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el item de lavado
      const response = await ItemTipoLavadoService.deleteItemTipoLavado(id);
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
export default ItemTipoLavadoController;