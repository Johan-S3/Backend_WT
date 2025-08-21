import Permiso from "../models/Permiso.js";
import PermisoRol from "../models/PermisoRol.js";
import Rol from "../models/Rol.js";

class PermisoRolService {

  static async getPermisosRoles() {
    try {
      const permisoRolInstance = new PermisoRol();
      const permisosRoles = await permisoRolInstance.getAll();
      // Validamos si no hay permisosRoles
      if (permisosRoles.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay permisos asignados a roles",
        };
      }
      // Retornamos las categorías obtenidas
      return {
        error: false,
        code: 200,
        message: "Permisos de roles obtenidos correctamente",
        data: permisosRoles,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los permisos de los roles",
      };
    }
  }

  static async getPermisoRolById(id) {
    try {
      const permisoRolInstance = new PermisoRol();
      const permisoRol = await permisoRolInstance.getById(id);
      // Validamos si no hay permisosRoles
      if (permisoRol.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Permiso de rol obtenido correctamente",
        data: permiso,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el permiso de rol",
      };
    }
  }

  static async createPermisoRol(idRol, idPermiso) {
    try {
      // Se instancia la clase permisoRol para poder acceder a sus metodos.
      const permisoRolInstance = new PermisoRol();
      const rolInstance = new Rol();
      const permisoInstance = new Permiso();

      // Se consulta si existe un rol con el id ingresado
      const rolExiste = await rolInstance.getById(idRol);
      // Se valida se no existe el rol
      if (rolExiste.length === 0) {
        return {
          error: true,
          code: 404,
          message: "El rol ingresado no existe",
        };
      }

      // Se consulta si existe un permiso con el id ingresado
      const permisoExiste = await permisoInstance.getById(idPermiso);
      // Se valida se no existe el permiso
      if (permisoExiste.length === 0) {
        return {
          error: true,
          code: 404,
          message: "El permiso ingresado no existe",
        };
      }

      const permisosPorRolExistente = await permisoRolInstance.getByRolId(idRol);
      const asignacionExistente = permisosPorRolExistente.filter(registro => registro.id_permiso == idPermiso);
      if (asignacionExistente.length != 0) {
        return {
          error: true,
          code: 404,
          message: "El permiso ingresado ya está asignado a ese rol",
        };
      }

      // Se intenta crear el permisoRol
      const permisoRol = await permisoRolInstance.create(idRol, idPermiso);
      // Validamos si no se pudo crear el permisoRol
      if (permisoRol === null) {
        return {
          error: true,
          code: 400,
          message: "Error al agregar el permiso al rol",
        };
      }
      // Retornamos el nuevo permiso creado
      return {
        error: false,
        code: 201,
        message: "Permiso asignado al rol correctamente",
        data: permisoRol,
      };

    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al agregar el permiso al rol",
      };
    }
  }

  static async updatepermisoRol(id, campos) {
    try {
      // Se instancia las clases de los modelos necesarios.
      const permisoRolInstance = new PermisoRol();
      const rolInstance = new Rol();
      const permisoInstance = new Permiso();

      const { id_rol, id_permiso } = campos

      // Consultamos el permisoRol por id
      const permisoRolExistente = await permisoRolInstance.getById(id);
      // Validamos si no existe el permisoRol
      if (permisoRolExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Asignación de permiso a rol no encontrado",
        };
      }

      // Se consulta si existe un rol con el id ingresado
      const rolExiste = await rolInstance.getById(id_rol);
      // Se valida se no existe el rol
      if (rolExiste.length === 0) {
        return {
          error: true,
          code: 404,
          message: "El rol ingresado no existe",
        };
      }

      // Se consulta si existe un permiso con el id ingresado
      const permisoExiste = await permisoInstance.getById(id_permiso);
      // Se valida se no existe el permiso
      if (permisoExiste.length === 0) {
        return {
          error: true,
          code: 404,
          message: "El permiso ingresado no existe",
        };
      }

      const permisosPorRolExistente = await permisoRolInstance.getByRolId(id_rol);
      const asignacionExistente = permisosPorRolExistente.filter(registro => registro.id_permiso == id_permiso);
      if (asignacionExistente.length != 0) {
        return {
          error: true,
          code: 404,
          message: "El permiso ingresado ya está asignado a ese rol",
        };
      }

      // Se intenta actualizar el permisoRol
      const permisoRol = await permisoRolInstance.update(id, campos);
      // Validamos si no se pudo actualizar el permiso
      if (permisoRol === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la asignación de permiso al rol",
        };
      }
      // Retornamos el permisoRol actualizado
      return {
        error: false,
        code: 200,
        message: "Permiso a rol actualizado correctamente",
        data: permisoRol,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el permiso al rol",
      };
    }
  }

  static async deletePermisoRol(id) {
    try {
      const permisoRolInstance = new PermisoRol();
      // Consultamos el permiso por id
      const permisoExistente = await permisoRolInstance.getById(id);
      // Validamos si no existe el permiso
      if (permisoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Permiso rol no encontrado",
        };
      }

      // Procedemos a eliminar el permiso
      const resultado = await permisoRolInstance.delete(id);
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
        message: "Asignacion de permiso a rol eliminado correctamente",
        data: permisoExistente,
      };
    } catch (error) {
      console.log(error);

      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el permiso del rol",
      };
    }
  }

}

export default PermisoRolService;