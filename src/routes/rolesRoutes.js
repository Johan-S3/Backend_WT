import express from "express";
import RolController from "../controllers/rolController.js";
import { validarRol, validarRolParcial } from "../middlewares/entidades/roles/validadorRol.js";

const router = express.Router();

/**
 * Rutas para la gestión de Roles.
 * 
 * Este enrutador define los endpoints principales para manejar los roles
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /roles
 * @description Obtiene el listado completo de roles para el superAdmin.
 */
router.get('/', RolController.getAllRoles);

/**
 * @route GET /roles/unicos
 * @description Obtiene el listado completo de roles para el superAdmin.
 */
router.get('/unicos', RolController.getAllRolesUnicos);

/**
 * @route GET /roles/:id
 * @description Obtiene el rol por el id ingresado.
 * @param {number} id - Identificador del rol a consultar.
 */
router.get('/:id', RolController.getRolById);

/**
 * @route POST /roles
 * @description Crea un nuevo rol en el sistema.
 * @middleware validarRol - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarRol, RolController.createRol);

/**
 * @route PUT /roles/:id
 * @description Actualiza la información de un rol existente por su ID.
 * @param {number} id - Identificador del rol a actualizar.
 */
router.put('/:id', validarRol, RolController.updateRol);

/**
 * @route DELETE /roles/:id
 * @description Elimina un rol por su ID.
 * @param {number} id - Identificador del rol a eliminar.
 */
router.delete('/:id', RolController.deleterol);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
