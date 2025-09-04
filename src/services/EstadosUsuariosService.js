import CRUD from "../models/CRUD.js";

class EstadosUsuariosService {

  static async getEstados() {
    try {
      const CRUDInstance = new CRUD();
      const estados = await CRUDInstance.getAll("estados_usuarios", "los estados de los usuarios");
      // Validamos si no hay estados
      if (estados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay estados registrados",
        };
      }
      // Retornamos los estados obtenidos
      return {
        error: false,
        code: 200,
        message: "Estados obtenidos correctamente",
        data: estados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los estados",
      };
    }
  }

}

export default EstadosUsuariosService;