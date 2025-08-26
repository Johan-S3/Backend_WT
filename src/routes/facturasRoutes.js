import express from "express";
import { validarFactura } from "../middlewares/facturas/validarFactura.js";
import FacturaController from "../controllers/FacturaController.js";

const router = express.Router();

/**
 * Rutas para la gestión de las facturas
 * 
 * Este enrutador define los endpoints principales para manejar los registros de las facturas
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /facturas
 * @description Obtiene el listado completo de las facturas.
 */
router.get('/', FacturaController.getAllFacturas);

/**
 * @route GET /facturas/:id
 * @description Obtiene la factura por el id ingresado.
 * @param {number} id - Identificador del factura a consultar.
 */
router.get('/:id', FacturaController.getFacturaById);

/**
 * @route POST /facturas
 * @description Crea una nueva factura en el sistema.
 * @middleware validarFactura - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarFactura, FacturaController.createFactura);

/**
 * @route PUT /facturas/:id
 * @description Actualiza la información de la factura en el sistema.
 * @param {number} id - Identificador de la factura a actualizar.
 * @middleware validarFactura - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarFactura, FacturaController.updateFactura);

/**
 * @route DELETE /facturas/:id
 * @description Elimina una factura por su ID.
 * @param {number} id - Identificador de la factura a eliminar.
 */
router.delete('/:id', FacturaController.deleteFactura);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;