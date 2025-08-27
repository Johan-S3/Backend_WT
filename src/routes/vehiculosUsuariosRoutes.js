import express from "express";
import VehiculoUsuarioController from "../controllers/VehiculoUsuarioController.js";
import { validarVehiculoUsuario, validarVehiculoUsuarioParcial } from "../middlewares/entidades/vehiculos_usuarios/validadorVehiculoUsuario.js";

const router = express.Router();

/**
 * Rutas para la gestión de la tabla relacional entre los vehiculos y los usuarios.
 * 
 * Este enrutador define los endpoints principales para manejar los vehiculos
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /vehiculosUsuarios
 * @description Obtiene el listado completo de las relaciones entre los vehiculos y los usuarios.
 */
router.get('/', VehiculoUsuarioController.getAllVehiculosUsuarios);

/**
 * @route GET /vehiculosUsuarios/:id
 * @description Obtiene la relación por el id ingresado.
 * @param {number} id - Identificador del vehiculo a consultar.
 */
router.get('/:id', VehiculoUsuarioController.getVehiculoUsuarioById);

/**
 * @route POST /vehiculosUsuarios
 * @description Crea una nueva relacion entre un vehiculo y un usuario en el sistema.
 * @middleware validarVehiculoUsuario - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarVehiculoUsuario, VehiculoUsuarioController.createVehiculoUsuario);

/**
 * @route PUT /vehiculosUsuarios/:id
 * @description Actualiza la información de unba relación entre un vehiculo y un usuario en el sistema.
 * @param {number} id - Identificador de la relación a actualizar.
 * @middleware validarVehiculoUsuario - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarVehiculoUsuario, VehiculoUsuarioController.updateVehiculoUsuario);

/**
 * @route DELETE /vehiculosUsuarios/:id
 * @description Elimina una relación por su ID.
 * @param {number} id - Identificador de la relación a eliminar.
 */
router.delete('/:id', VehiculoUsuarioController.deleteVehiculoUsuario);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
