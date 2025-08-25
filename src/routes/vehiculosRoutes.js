import express from "express";
import { validarVehiculo } from "../middlewares/vehiculos/validarVehiculo.js";
import VehiculoController from "../controllers/VehiculoController.js";

const router = express.Router();

/**
 * Rutas para la gestión de vehiculos.
 * 
 * Este enrutador define los endpoints principales para manejar los vehiculos
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /vehiculos
 * @description Obtiene el listado completo de los vehiculos.
 */
router.get('/', VehiculoController.getAllVehiculos);

/**
 * @route GET /vehiculos/:id
 * @description Obtiene el vehiculo por el id ingresado.
 * @param {number} id - Identificador del vehiculo a consultar.
 */
router.get('/:id', VehiculoController.getVehiculoById);

/**
 * @route POST /vehiculos
 * @description Crea un nuevo vehiculo en el sistema.
 * @middleware validarVehiculo - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarVehiculo, VehiculoController.createVehiculo);

/**
 * @route PUT /vehiculos/:id
 * @description Actualiza la información de un vehiculo existente por su ID.
 * @param {number} id - Identificador del vehiculo a actualizar.
 * @middleware validarVehiculo - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarVehiculo, VehiculoController.updateVehiculo);

/**
 * @route DELETE /vehiculos/:id
 * @description Elimina un vehiculo por su ID.
 * @param {number} id - Identificador del vehiculo a eliminar.
 */
router.delete('/:id', VehiculoController.deleteVehiculo);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
