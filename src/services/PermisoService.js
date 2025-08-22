import Permiso from "../models/Permiso.js";
import PermisoRol from "../models/PermisoRol.js";

class PermisoService {

  static async getPermisos() {
    try {
      const permisoInstance = new Permiso();
      const permisos = await permisoInstance.getAll();
      // Validamos si no hay permisos
      if (permisos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay permisos registrados",
        };
      }
      // Retornamos las categorías obtenidas
      return {
        error: false,
        code: 200,
        message: "Permisos obtenidas correctamente",
        data: permisos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los permisos",
      };
    }
  }

  static async getPermisoById(id) {
    try {
      const permisoInstance = new Permiso();
      const permiso = await permisoInstance.getById(id);
      // Validamos si no hay permisos
      if (permiso.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Permiso obtenido correctamente",
        data: permiso,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el permiso",
      };
    }
  }

  static async createPermiso(nombre, descripcion) {
    try {
      // Se instancia la clase permiso para poder acceder a sus metodos.
      const permisoInstance = new Permiso();

      // Se buscar un permiso por el nombre ingresado
      const permisoNameExiste = await permisoInstance.getByName(nombre.trim());
      // Validamos si existe el permiso con ese nombre
      if (permisoNameExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "El nombre del permiso ingresado ya está en uso",
        };
      }

      // Se intenta crear el permiso
      const permiso = await permisoInstance.create(nombre.trim(), descripcion.trim());
      // Validamos si no se pudo crear el permiso
      if (permiso === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el permiso",
        };
      }
      // Retornamos el nuevo permiso creado
      return {
        error: false,
        code: 201,
        message: "Permiso creado correctamente",
        data: permiso,
      };

    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al crear el permiso",
      };
    }
  }

  static async updatepermiso(id, campos) {
    try {
      const permisoInstance = new Permiso();

      const { nombre_permiso, descripcion_permiso } = campos


      // Consultamos el permiso por id
      const permisoExistente = await permisoInstance.getById(id);
      // Validamos si no existe el permiso
      if (permisoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };
      }

      // Se buscar un permiso por el nombre ingresado
      const permisoNameExiste = await permisoInstance.getByName(nombre_permiso.trim());
      // Validamos si existe el permiso con ese nombre diferente a este
      if (permisoNameExiste.length != 0 && nombre_permiso.trim() != permisoExistente.nombre_permiso) {
        return {
          error: true,
          code: 400,
          message: "El nombre del permiso ingresado ya está en uso",
        };
      }

      // Se intenta actualizar el permiso
      const permiso = await permisoInstance.update(id, campos);
      // Validamos si no se pudo actualizar el permiso
      if (permiso === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el permiso",
        };
      }
      // Retornamos el permiso actualizado
      return {
        error: false,
        code: 200,
        message: "Permiso actualizado correctamente",
        data: permiso,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el permiso",
      };
    }
  }

  static async deletePermiso(id) {
    try {
      const permisoInstance = new Permiso();
      // Consultamos el permiso por id
      const permisoExistente = await permisoInstance.getById(id);
      // Validamos si no existe el permiso
      if (permisoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };
      }
      // Instancio la clase del modelo que se necesita.
      const permisoRolInstance = new PermisoRol();
      // Consultamos los permisos asociados al rol en la tabla relacional
      const permisosBeRoles = await permisoRolInstance.getByPermisoId(id);
      // Validamos si el permiso pertenece a un rol
      if (permisosBeRoles.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el permiso debido a que está asociados a uno o más roles.",
        };
      }

      // Procedemos a eliminar el permiso
      const resultado = await permisoInstance.delete(id);
      // Validamos si no se pudo eliminar el permiso
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
        message: "Permiso eliminado correctamente",
        data: permisoExistente,
      };
    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el permiso",
      };
    }
  }

}

export default PermisoService;