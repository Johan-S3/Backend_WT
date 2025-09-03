import express from "express";
import ItemTipoLavadoController from "../controllers/ItemTipoLavadoController.js";
import { validarItemTipoLavado, validarItemTipoLavadoParcial } from "../middlewares/entidades/items_tipos_lavados/validadorItemTipoLavado.js";

const router = express.Router();

/**
 * Rutas para la gestión de la tabla relacional entre los Items de lavados y los tipos de lavados.
 * 
 * Este enrutador define los endpoints principales para manejar los registros de la relación entre los items y tipos de lavados
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /itemsTiposLavados
 * @description Obtiene el listado completo de las relaciones entre los items y tipos de lavados.
 */
router.get('/', ItemTipoLavadoController.getAllItemsTiposLavados);

/**
 * @route GET /itemsTiposLavados/:id
 * @description Obtiene la relación por el id ingresado.
 * @param {number} id - Identificador de la relación a consultar.
 */
router.get('/:id', ItemTipoLavadoController.getItemTipoLavadoById);

/**
 * @route GET /itemsTiposLavados/tipoLav/:id
 * @description Obtiene la relación por el id ingresado.
 * @param {number} id - Identificador de del tipo de lavado para consultar sus items relacionados.
 */
router.get('/tipoLav/:id', ItemTipoLavadoController.getItemsByIdTipoLavado);

/**
 * @route POST /itemsTiposLavados
 * @description Crea una nueva relación en el sistema.
 * @middleware validarItemTipoLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarItemTipoLavado, ItemTipoLavadoController.createItemTipoLavado);

/**
 * @route PUT /itemsTiposLavados/:id
 * @description Actualiza la información de la relación en el sistema.
 * @param {number} id - Identificador de la relación a actualizar.
 * @middleware validarItemTipoLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarItemTipoLavado, ItemTipoLavadoController.updateItemTipoLavado);

/**
 * @route DELETE /itemsTiposLavados/:id
 * @description Elimina una relación por su ID.
 * @param {number} id - Identificador de la relación a eliminar.
 */
router.delete('/:id', ItemTipoLavadoController.deleteItemTipoLavado);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
