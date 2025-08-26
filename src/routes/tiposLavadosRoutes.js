import express from "express";
import { validarTipoLavado } from "../middlewares/tiposLavados/validarTipoLavado.js";
import TipoLavadoController from "../controllers/TipoLavadoController.js";

TipoLavadoController

const router = express.Router();

/**
 * Rutas para la gestión de la tabla relacional entre los Tipos de lavados.
 * 
 * Este enrutador define los endpoints principales para manejar los tipos de lavados
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /tiposLavados
 * @description Obtiene el listado completo de las relaciones entre los tipo de lavados y los usuarios.
 */
router.get('/', TipoLavadoController.getAllTiposLavados);

/**
 * @route GET /tiposLavados/:id
 * @description Obtiene el tipo de lavado por el id ingresado.
 * @param {number} id - Identificador del tipo de lavado a consultar.
 */
router.get('/:id', TipoLavadoController.getTipoLavadoById);

/**
 * @route POST /tiposLavados
 * @description Crea un nuevo tipo de lavado en el sistema.
 * @middleware validarTipoLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarTipoLavado, TipoLavadoController.createTipoLavado);

/**
 * @route PUT /tiposLavados/:id
 * @description Actualiza la información de tipo de lavado en el sistema.
 * @param {number} id - Identificador de el tipo de lavado a actualizar.
 * @middleware validarTipoLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarTipoLavado, TipoLavadoController.updateTipoLavado);

/**
 * @route DELETE /tiposLavados/:id
 * @description Elimina un tipo de lavado por su ID.
 * @param {number} id - Identificador de el tipo de lavado a eliminar.
 */
router.delete('/:id', TipoLavadoController.deleteTipoLavado);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
