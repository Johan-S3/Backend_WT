import express from "express";
import ItemLavadoController from "../controllers/ItemLavadoController.js";
import { validarItemLavado, validarItemLavadoParcial } from "../middlewares/entidades/itemsLavados/validadorItemLavado.js";

const router = express.Router();

/**
 * Rutas para la gestión de los Items de lavados.
 * 
 * Este enrutador define los endpoints principales para manejar los items de lavados
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /itemsLavados
 * @description Obtiene el listado completo de las relaciones entre los items de lavados.
 */
router.get('/', ItemLavadoController.getAllItemsLavados);

/**
 * @route GET /itemsLavados/:id
 * @description Obtiene el item de lavado por el id ingresado.
 * @param {number} id - Identificador del item de lavado a consultar.
 */
router.get('/:id', ItemLavadoController.getItemLavadoById);

/**
 * @route GET /itemsLavados/tipoVeh/:id
 * @description Obtiene el item de lavado por el id ingresado.
 * @param {number} id - Identificador del item de lavado a consultar.
 */
router.get('/tipoVeh/:id', ItemLavadoController.getItemLavadoByIdTipoVeh);

/**
 * @route POST /itemsLavados
 * @description Crea un nuevo item de lavado en el sistema.
 * @middleware validarItemLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarItemLavado, ItemLavadoController.createItemLavado);

/**
 * @route PUT /itemsLavados/:id
 * @description Actualiza la información de item de lavado en el sistema.
 * @param {number} id - Identificador de el item de lavado a actualizar.
 * @middleware validarItemLavado - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarItemLavado, ItemLavadoController.updateItemLavado);

/**
 * @route DELETE /itemsLavados/:id
 * @description Elimina un tipo de lavado por su ID.
 * @param {number} id - Identificador de el tipo de lavado a eliminar.
 */
router.delete('/:id', ItemLavadoController.deleteItemLavado);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
