import express from "express";
import PermisoController from "../controllers/PermisoController.js";
import { camposPermiso } from "../middlewares/permisos/camposPermiso.js";

const router = express.Router();

/**
 * Rutas para la gestión de Permisos.
 * 
 * Este enrutador define los endpoints principales para manejar los permisos
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /permisos
 * @description Obtiene el listado completo de permisos.
 */
router.get('/', PermisoController.getAllPermisos);

/**
 * @route POST /permisos
 * @description Crea un nuevo permiso en el sistema.
 * @middleware camposPermiso - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', camposPermiso, PermisoController.createPermiso);

/**
 * @route PUT /permisos/:id
 * @description Actualiza la información de un permiso existente por su ID.
 * @param {number} id - Identificador del permiso a actualizar.
 */
router.put('/:id', camposPermiso, PermisoController.updatePermiso);

/**
 * @route DELETE /permisos/:id
 * @description Elimina un permiso por su ID.
 * @param {number} id - Identificador del permiso a eliminar.
 */
router.delete('/:id', PermisoController.deletePermiso);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
