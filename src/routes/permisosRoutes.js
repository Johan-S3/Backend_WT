import express from "express";
import PermisoController from "../controllers/PermisoController.js";
import { validarPermisoParcial, validarPernmiso } from "../middlewares/entidades/permisos/validadorPermiso.js";
import { verifyToken } from "../middlewares/auth/verifyToken.js";
import { verifyPermiso } from "../middlewares/auth/verifyPermiso.js";

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
router.get('/', verifyToken, verifyPermiso("permisos.index"), PermisoController.getAllPermisos);

/**
 * @route POST /permisos
 * @description Crea un nuevo permiso en el sistema.
 * @middleware validarPernmiso - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', verifyToken, verifyPermiso("permisos.create"), validarPernmiso, PermisoController.createPermiso);

/**
 * @route PUT /permisos/:id
 * @description Actualiza la información de un permiso existente por su ID.
 * @param {number} id - Identificador del permiso a actualizar.
 */
router.put('/:id', verifyToken, verifyPermiso("permisos.update"), validarPernmiso, PermisoController.updatePermiso);

/**
 * @route DELETE /permisos/:id
 * @description Elimina un permiso por su ID.
 * @param {number} id - Identificador del permiso a eliminar.
 */
router.delete('/:id', verifyToken, verifyPermiso("permisos.delete"), PermisoController.deletePermiso);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
