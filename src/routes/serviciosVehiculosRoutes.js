import express from "express";
import servicioVehiculoController from "../controllers/ServicioVehiculoController.js";
import { validarServicioVehiculo, validarServicioVehiculoParcial } from "../middlewares/entidades/serviciosVehiculos/validadorServicioVehiculo.js";

const router = express.Router();

/**
 * Rutas para la gestión de Servicios de vehiculos.
 * 
 * Este enrutador define los endpoints principales para manejar los servicios de vehiculos
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /serviciosVehiculos
 * @description Obtiene el listado completo de los servicios de vehiculos.
 */
router.get('/', servicioVehiculoController.getAllServiciosVehiculos);

/**
 * @route GET /serviciosVehiculos/:id
 * @description Obtiene el servicio de vehiculo por el id ingresado.
 * @param {number} id - Identificador del servicio de vehiculo a consultar.
 */
router.get('/:id', servicioVehiculoController.getServicioVehById);

/**
 * @route POST /serviciosVehiculos
 * @description Crea un nuevo servicio de vehiculo en el sistema.
 * @middleware validarServicioVehiculo - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarServicioVehiculo, servicioVehiculoController.createServicioVeh);

/**
 * @route PUT /serviciosVehiculos/:id
 * @description Actualiza la información de un servicio de vehiculo existente por su ID.
 * @param {number} id - Identificador del servicio de vehiculo a actualizar.
 * @middleware validarServicioVehiculo - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarServicioVehiculo, servicioVehiculoController.updateServicioVeh);

/**
 * @route DELETE /serviciosVehiculos/:id
 * @description Elimina un servicio de vehiculo por su ID.
 * @param {number} id - Identificador del servicio de vehiculo a eliminar.
 */
router.delete('/:id', servicioVehiculoController.deleteservicioVehiculo);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
