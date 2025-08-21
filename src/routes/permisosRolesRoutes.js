import express from "express";
import PermisoRolController from "../controllers/PermisoRolController.js";
import { camposPermisoRol } from "../middlewares/permisos_roles/camposPermisoRol.js";


const router = express.Router();

/**
 * Rutas para la gestión de PermisosRoles.
 * 
 * Este enrutador define los endpoints principales para manejar los permisos_roles
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /permisosRoles
 * @description Obtiene el listado completo de la tabla permisos_roles.
 */
router.get('/', PermisoRolController.getAllPermisosRoles);

/**
 * @route POST /permisosRoles
 * @description Crea un nuevo permiso_rol en el sistema.
 * @middleware camposPermisoRol - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', camposPermisoRol, PermisoRolController.createPermisoRol);

/**
 * @route PUT /permisosRoles/:id
 * @description Actualiza la información de un permiso_rol existente por su ID.
 * @param {number} id - Identificador del permiso a actualizar.
 */
router.put('/:id', PermisoRolController.updatePermisoRol);

/**
 * @route DELETE /permisosRoles/:id
 * @description Elimina un permiso por su ID.
 * @param {number} id - Identificador del permiso_rol a eliminar.
 */
router.delete('/:id', PermisoRolController.deletePermisoRol);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
