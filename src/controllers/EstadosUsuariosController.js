import { ResponseProvider } from "../providers/ResponseProvider.js";
import EstadosUsuariosService from "../services/EstadosUsuariosService.js";

class EstadosUsuariosController {
  // Obtener todos los estados de los usuarios
  static getAllEstados = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los registros
      const response = await EstadosUsuariosService.getEstados();
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


}
export default EstadosUsuariosController;