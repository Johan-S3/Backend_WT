import express from "express";
import EstadosUsuariosController from "../controllers/EstadosUsuariosController.js";

const router = express.Router();

/**
 * Rutas para la gestión de los estados de los usuarios
 * 
 * Este enrutador define los endpoints principales para manejar los registros de los estados de los usuarios
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /estadosUsuarios
 * @description Obtiene el listado completo de los estados.
 */
router.get('/', EstadosUsuariosController.getAllEstados);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
