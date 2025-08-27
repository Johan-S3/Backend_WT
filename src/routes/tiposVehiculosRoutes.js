import express from "express";
import TipoVehiculoController from "../controllers/TipoVehiculoController.js";
import { validarTipoVehiculo, validarTipoVehiculoParcial } from "../middlewares/entidades/tiposVehiculos/validadorTipoVehiculo.js";

const router = express.Router();

/**
 * Rutas para la gestión de Tipos de vehiculos.
 * 
 * Este enrutador define los endpoints principales para manejar los tipoos de vehiculos
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /tiposVehiculos
 * @description Obtiene el listado completo de los tipos de vehiculos.
 */
router.get('/', TipoVehiculoController.getAllTiposVehiculos);

/**
 * @route GET /tiposVehiculos/:id
 * @description Obtiene el tipo de vehiculo por el id ingresado.
 * @param {number} id - Identificador del tipo de vehiculo a consultar.
 */
router.get('/:id', TipoVehiculoController.getTipoVehById);

/**
 * @route POST /tiposVehiculos
 * @description Crea un nuevo tipo de vehiculo en el sistema.
 * @middleware validarTipoVehiculo - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarTipoVehiculo, TipoVehiculoController.createTipoVeh);

/**
 * @route PUT /tiposVehiculos/:id
 * @description Actualiza la información de un tipo de vehiculo existente por su ID.
 * @param {number} id - Identificador del tipo de vehiculo a actualizar.
 * @middleware validarTipoVehiculo - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarTipoVehiculo, TipoVehiculoController.updateTipoVeh);

/**
 * @route DELETE /tiposVehiculos/:id
 * @description Elimina un tipo de vehiculo por su ID.
 * @param {number} id - Identificador del tipo de vehiculo a eliminar.
 */
router.delete('/:id', TipoVehiculoController.deleteTipoVehiculo);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
