import Rol from "../models/Rol.js";

class RolService { 

  static async getRoles()
  { 
    try {
      const rolInstance = new Rol();
      const roles = await rolInstance.getAll();
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
      const rolInstance = new Rol();
      const rol = await rolInstance.getById(id);
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

  static async createRol(nombre) {
    try {
      // Se instancia la clase rol para poder acceder a sus metodos.
      const rolInstance = new Rol();

      // Se buscar un rol por el nombre ingresado
      const rolNameExiste = await rolInstance.getByName(nombre.trim());
      // Validamos si existe el rol con ese nombre
      if (rolNameExiste.length != 0) {
        return {
          error: true,
          code: 400,
          message: "El nombre del Rol ingresado ya está en uso",
        };
      }

      // Se intenta crear el rol
      const rol = await rolInstance.create(nombre.trim());
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

  static async updateRol(id, nombre) { 
    try {
      const rolInstance = new Rol();

      // Consultamos el rol por id
      const rolExistente = await rolInstance.getById(id);
      // Validamos si no existe el rol
      if (rolExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };
      }

      // Se buscar un rol por el nombre ingresado
      const rolNameExiste = await rolInstance.getByName(nombre.trim());
      // Validamos si existe el rol con ese nombre
      console.log(rolExistente);
      
      if (rolNameExiste.length != 0 && nombre.trim() != rolExistente.nombre_rol) {
        return {
          error: true,
          code: 400,
          message: "El nombre del Rol ingresado ya está en uso",
        };
      }

      // Se intenta actualizar el rol
      const rol = await rolInstance.update(id, nombre); 
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
      const rolInstance = new Rol();
      // Consultamos el rol por id
      const rolExistente = await rolInstance.getById(id);
      // Validamos si no existe el rol
      if (rolExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };
      }
      // // Consultamos los productos asociados a la categoría
      // const productos = await rolInstance.productos(id);
      // // Validamos si la categoría tiene productos asociados
      // if (productos.length > 0) {
      //   return {
      //     error: true,
      //     code: 400,
      //     message: "No se puede eliminar la categoría, tiene productos asociados",
      //   };
      // }

      // Procedemos a eliminar el rol
      const resultado = await rolInstance.delete(id); 
      // Validamos si no se pudo eliminar el rol
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
        message: "Rol eliminado correctamente",
        data: rolExistente,
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