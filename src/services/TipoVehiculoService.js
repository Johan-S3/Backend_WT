import CRUD from "../models/CRUD.js";
import ItemLavado from "../models/ItemLavado.js";
import TipoLavado from "../models/TipoLavado.js";
import TipoVehiculo from "../models/TipoVehiculo.js";
import Vehiculo from "../models/Vehiculo.js";

class TipoVehiculoService {

  static async getTiposVehiculos() {
    try {
      const CRUDInstance = new CRUD();
      const tiposVehiculos = await CRUDInstance.getAll("tipos_vehiculos", "los tipos de vehiculos");
      // Validamos si no hay tipos de vehiculos
      if (tiposVehiculos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay tipos de vehiculos registrados",
        };
      }
      // Retornamos los tipos de vehiculos obtenidos
      return {
        error: false,
        code: 200,
        message: "Tipos de vehiculos obtenidos correctamente",
        data: tiposVehiculos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los tipos de vehiculos",
      };
    }
  }

  static async getTipoVehiculoById(id) {
    try {
      const CRUDInstance = new CRUD();
      const tipoVehiculo = await CRUDInstance.getByID("tipos_vehiculos", id, "el tipo de vehiculo");
      // Validamos si no hay tipos de vehiculos
      if (tipoVehiculo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de vehiculo no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipo de vehiculo obtenido correctamente",
        data: tipoVehiculo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el tipo de vehiculo",
      };
    }
  }

  static async createTipoVehiculo(campos) {
    try {
      // Se instancia la clase tipoVehiculo para poder acceder a sus metodos.
      const tipoVehInstance = new TipoVehiculo();
      const CRUDInstance = new CRUD();

      // Destructuro el objeto campos para obtener los datos necesarios para su validación.
      const { nombre_tipo } = campos;

      // Se buscar un permiso por el nombre ingresado
      const tipoVehNameExiste = await tipoVehInstance.getByName(nombre_tipo.trim());
      
      // Validamos si existe el tipo de vehiculo con ese nombre
      if (tipoVehNameExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "El nombre del tipo de vehiculo ingresado ya está en uso",
        };
      }

      // Se intenta crear el tipo de vehiculo
      const tipoVehiculo = await CRUDInstance.create("tipos_vehiculos", campos, "el tipo de vehiculo");
      // Validamos si no se pudo crear el tipo de vehiculo
      if (tipoVehiculo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el tipo de vehiculo",
        };
      }
      // Retornamos el nuevo tipo de vehiculo creado
      return {
        error: false,
        code: 201,
        message: "Tipo de vehiculo creado correctamente",
        data: tipoVehiculo,
      };

    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al crear el tipo de vehiculo" + error,
      };
    }
  }

  static async updateTipoVehiculo(id, campos) {
    try {
      const CRUDInstance = new CRUD();
      const tipoVehInstance = new TipoVehiculo();

      const { nombre_tipo } = campos


      // Consultamos el tipo de vehiculo por id
      const tipoVehExistente = await CRUDInstance.getByID("tipos_vehiculos", id, "el tipo de vehiculo");
      // Validamos si no existe el tipo de vehiculo
      if (tipoVehExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de vehiculo no encontrado",
        };
      }

      // Se buscar un permiso por el nombre ingresado
      const tipoVehNameExiste = await tipoVehInstance.getByName(nombre_tipo.trim());      
      
      // Validamos si existe el tipo de vehiculo con ese nombre
      if (tipoVehNameExiste.length != 0 && nombre_tipo.trim() != tipoVehExistente[0].nombre_tipo) {
        return {
          error: true,
          code: 400,
          message: "El nombre del tipo de vehiculo ingresado ya está en uso",
        };
      }

      // Se intenta actualizar el tipo de vehiculo
      const tipoVehiculo = await CRUDInstance.update("tipos_vehiculos", id, campos, "el tipo de vehiculo");
      // Validamos si no se pudo actualizar el tipo de vehiculo
      if (tipoVehiculo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tipo de vehiculo",
        };
      }
      // Retornamos el tipo de vehiculo actualizado
      return {
        error: false,
        code: 200,
        message: "Tipo de vehiculo actualizado correctamente",
        data: tipoVehiculo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el tipo de vehiculo" + error,
      };
    }
  }

  static async deleteTipoVehiculo(id) {
    try {
      const CRUDInstance = new CRUD();

      // Consultamos el tipo de vehiculo por id
      const tipoVehExistente = await CRUDInstance.getByID("tipos_vehiculos", id, "el tipo de vehiculo");
      // Validamos si no existe el tipo de vehiculo
      if (tipoVehExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de vehiculo no encontrado",
        };
      }

      const tipoLavadoInstance = new TipoLavado();
      // Consultamos el tipo de vehiculo por id en la tabla tipos_lavados
      const tipoVehWithTipoLav = await tipoLavadoInstance.getByIdTipoVehiculo(id);
      // Validamos si existe una relacion entre tipo de lavado y tipo de vehiculo
      if (tipoVehWithTipoLav.length > 0) {
        return {
          error: true,
          code: 404,
          message: "No se puede eliminar el tipo de vehículo porque está asignado a uno o más tipos de lavados",
        };
      }

      const itemLavadoInstance = new ItemLavado();
      // Consultamos el tipo de vehiculo por id en la tabla items_lavados
      const tipoVehWithItemLav = await itemLavadoInstance.getByIdTipoVehiculo(id);
      // Validamos si existe una relacion entre tipo de lavado y item de lavado
      if (tipoVehWithItemLav.length > 0) {
        return {
          error: true,
          code: 404,
          message: "No se puede eliminar el tipo de vehículo porque está asignado a uno o más items de lavado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const vehiculoInstance = new Vehiculo();
      // Consultamos los vehiculos asociados al tipo de vehiculo que se quiere eliminar
      const vehiculoWithTipo = await vehiculoInstance.getByIdTipoVeh(id);
      // Validamos si el permiso pertenece a un rol
      if (vehiculoWithTipo.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el tipo de vehiculo debido a que está asociado a uno o más vehiculos",
        };
      }

      // Procedemos a eliminar el tipo de vehiculo
      const resultado = await CRUDInstance.delete("tipos_vehiculos", id, "el tipo de vehiculo");
      // Validamos si no se pudo eliminar el tipo de vehiculo
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
        message: "Tipo de vehiculo eliminado correctamente"
      };
    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el tipo de vehiculo",
      };
    }
  }

}

export default TipoVehiculoService;