import express from "express";
import LavadoController from "../controllers/LavadoController.js";
import { validarLavado, validarLavadoParcial } from "../middlewares/entidades/lavados/validadorLavado.js";

const router = express.Router();

/**
 * Rutas para la gestión de los lavados
 * 
 * Este enrutador define los endpoints principales para manejar los registros de los lavados
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /lavados
 * @description Obtiene el listado completo de los lavados.
 */
router.get('/', LavadoController.getAllLavados);

/**
 * @route GET /lavados/pendientes
 * @description Obtiene el listado completo de los lavados.
 */
router.get('/pendientes', LavadoController.getAllLavadosPendientes);

/**
 * @route GET /lavados/pendientes
 * @description Obtiene el listado completo de los lavados.
 */
router.get('/enProceso', LavadoController.getAllLavadosEnProceso);

/**
 * @route GET /lavados/:id
 * @description Obtiene el lavado por el id ingresado.
 * @param {number} id - Identificador del lavado a consultar.
 */
router.get('/:id', LavadoController.getLavadoById);

/**
 * @route GET /lavados/pendientes/:id
 * @description Obtiene el lavado pendiente por el id ingresado.
 * @param {number} id - Identificador del lavado a consultar.
 */
router.get('/pendientes/:id', LavadoController.getLavadoPendienteById);

/**
 * @route GET /lavados/enProceso/:id
 * @description Obtiene el lavado pendiente por el id ingresado.
 * @param {number} id - Identificador del lavado a consultar.
 */
router.get('/enProceso/:id', LavadoController.getLavadoEnProcesoById);

/**
 * @route POST /lavados
 * @description Crea un nuevo lavado en el sistema.
 * @middleware validarLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarLavado, LavadoController.createLavado);

/**
 * @route PUT /lavados/:id
 * @description Actualiza la información del lavado en el sistema.
 * @param {number} id - Identificador del lavado a actualizar.
 * @middleware validarLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarLavado, LavadoController.updateLavado);

/**
 * @route DELETE /lavados/:id
 * @description Elimina un lavado por su ID.
 * @param {number} id - Identificador del lavado a eliminar.
 */
router.delete('/:id', LavadoController.deleteLavado);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
