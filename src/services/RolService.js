import CRUD from "../models/CRUD.js";
import PermisoRol from "../models/PermisoRol.js";
import Rol from "../models/Rol.js";

class RolService {

  static async getRoles() {
    try {
      const rolInstance = new Rol();
      const roles = await rolInstance.getRolesPermitidos();
      // Validamos si no hay roles
      if (roles.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay roles registrados",
        };
      }
      // Retornamos las categorías obtenidas
      return {
        error: false,
        code: 200,
        message: "Roles obtenidas correctamente",
        data: roles,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los roles",
      };
    }
  }

  static async getRolById(id) {
    try {
      const CRUDInstance = new CRUD();
      const rol = await CRUDInstance.getByID("roles", id, "el rol");
      // Validamos si no hay roles
      if (rol.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Rol obtenido correctamente",
        data: rol,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el rol",
      };
    }
  }

  static async createRol(campos) {
    try {
      // Se instancia la clase rol para poder acceder a sus metodos.
      const rolInstance = new Rol();

      const CRUDInstance = new CRUD();

      const { nombre_rol } = campos;

      // Se buscar un rol por el nombre ingresado
      const rolNameExiste = await rolInstance.getByName(nombre_rol.trim());
      // Validamos si existe el rol con ese nombre
      if (rolNameExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "El nombre del Rol ingresado ya está en uso",
        };
      }

      // Se intenta crear el rol
      const rol = await CRUDInstance.create("roles", campos, "el rol");
      // Validamos si no se pudo crear el rol
      if (rol === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el rol",
        };
      }
      // Retornamos el nuevo rol creado
      return {
        error: false,
        code: 201,
        message: "Rol creado correctamente",
        data: rol,
      };

    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el rol",
      };
    }
  }

  static async updateRol(id, campos) {
    try {
      const rolInstance = new Rol();
      const CRUDInstance = new CRUD();

      // Consultamos el rol por id
      const rolExistente = await CRUDInstance.getByID("roles", id, "el rol");      
      // Validamos si no existe el rol
      if (rolExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };
      }

      const { nombre_rol } = campos;

      // Se buscar un rol por el nombre ingresado
      const rolNameExiste = await rolInstance.getByName(nombre_rol.trim());
      
      // Validamos si existe el rol con ese nombre
      if (rolNameExiste.length != 0 && nombre_rol.trim().toLowerCase() != rolExistente[0].nombre_rol.toLowerCase()) {
        return {
          error: true,
          code: 400,
          message: "El nombre del Rol ingresado ya está en uso",
        };
      }

      // Se intenta actualizar el rol
      const rol = await CRUDInstance.update("roles", id, campos, "el rol");
      // Validamos si no se pudo actualizar el rol
      if (rol === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el rol",
        };
      }
      // Retornamos el rol actualizada
      return {
        error: false,
        code: 200,
        message: "Rol actualizado correctamente",
        data: rol,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el rol",
      };
    }
  }

  static async deleteRol(id) {
    try {
      const CRUDInstance = new CRUD();
      // Consultamos el rol por id
      const rolExistente = await CRUDInstance.getByID("roles", id, "el rol");
      // Validamos si no existe el rol
      if (rolExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };
      }

      // Instancio la clase del modelo que se necesita.
      const permisoRolInstance = new PermisoRol();
      // Consultamos los roles asociados al permiso en la tabla relacional
      const rolHasPermisos = await permisoRolInstance.getByRolId(id);
      // Validamos si el rol tiene permisos asignados
      if (rolHasPermisos.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el rol debido a que tiene permisos asignados.",
        };
      }

      // Procedemos a eliminar el rol
      const resultado = await CRUDInstance.delete("roles", id, "el rol");
      // Validamos si no se pudo eliminar el rol
      if (!resultado) {
        return {
          error: true,
          code: 400,
          message: "El rol no se pudo eliminar",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Rol eliminado correctamente"
      };
    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el rol",
      };
    }
  }

}

export default RolService;