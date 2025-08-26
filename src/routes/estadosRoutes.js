import express from "express";
import { validarEstado } from "../middlewares/estados/validarEstado.js";
import EstadoController from "../controllers/EstadoController.js";

const router = express.Router();

/**
 * Rutas para la gestión de los estados
 * 
 * Este enrutador define los endpoints principales para manejar los registros de los estados
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /estados
 * @description Obtiene el listado completo de los estados.
 */
router.get('/', EstadoController.getAllEstados);

/**
 * @route GET /estados/:id
 * @description Obtiene el estado id ingresado.
 * @param {number} id - Identificador del estado a consultar.
 */
router.get('/:id', EstadoController.getEstadoById);

/**
 * @route POST /estados
 * @description Crea un nuevo estado en el sistema.
 * @middleware validarEstado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarEstado, EstadoController.createEstado);

/**
 * @route PUT /estados/:id
 * @description Actualiza la información del estado en el sistema.
 * @param {number} id - Identificador del estado a actualizar.
 * @middleware validarEstado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarEstado, EstadoController.updateEstado);

/**
 * @route DELETE /estados/:id
 * @description Elimina un estado por su ID.
 * @param {number} id - Identificador del estado a eliminar.
 */
router.delete('/:id', EstadoController.deleteEstado);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
