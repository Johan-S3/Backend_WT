import express from "express";
import RolController from "../controllers/rolController.js";
import { camposRol } from "../middlewares/roles/camposRol.js";

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
 * @description Obtiene el listado completo de roles.
 */
router.get('/', RolController.getAllRoles);

/**
 * @route POST /roles
 * @description Crea un nuevo rol en el sistema.
 * @middleware camposRol - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', camposRol, RolController.createRol);

/**
 * @route PUT /roles/:id
 * @description Actualiza la información de un rol existente por su ID.
 * @param {number} id - Identificador del rol a actualizar.
 */
router.put('/:id', RolController.updateRol);

/**
 * @route DELETE /roles/:id
 * @description Elimina un rol por su ID.
 * @param {number} id - Identificador del rol a eliminar.
 */
router.delete('/:id', RolController.deleterol);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
