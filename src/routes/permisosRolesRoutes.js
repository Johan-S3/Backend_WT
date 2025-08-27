import express from "express";
import PermisoRolController from "../controllers/PermisoRolController.js";
import { validarPermisoRolParcial, validarPernmisoRol } from "../middlewares/entidades/permisos_roles/validadorPermisoRol.js";



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
 * @middleware validarPernmisoRol - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarPernmisoRol, PermisoRolController.createPermisoRol);

/**
 * @route PUT /permisosRoles/:id
 * @description Actualiza la información de un permiso_rol existente por su ID.
 * @param {number} id - Identificador del permiso a actualizar.
 */
router.put('/:id', validarPernmisoRol, PermisoRolController.updatePermisoRol);

/**
 * @route DELETE /permisosRoles/:id
 * @description Elimina un permiso por su ID.
 * @param {number} id - Identificador del permiso_rol a eliminar.
 */
router.delete('/:id', PermisoRolController.deletePermisoRol);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
