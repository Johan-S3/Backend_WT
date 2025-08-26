import express from "express";
import { validarDetalleFactura } from "../middlewares/detalles_facturas/validarDetalleFactura.js";
import DetalleFacturaController from "../controllers/DetalleFacturaController.js";

const router = express.Router();

/**
 * Rutas para la gestión de la tabla relacional (detalle_factura) entre la factura y los items de lavado
 * 
 * Este enrutador define los endpoints principales para manejar los registros de los detalles de facturas
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /detalleFactura
 * @description Obtiene el listado completo de los detalles de facturas.
 */
router.get('/', DetalleFacturaController.getAllSDetallesFacturas);

/**
 * @route GET /detalleFactura/:id
 * @description Obtiene el detalle de factura por el id ingresado.
 * @param {number} id - Identificador del detalle de factura a consultar.
 */
router.get('/:id', DetalleFacturaController.getDetalleFacturaById);

/**
 * @route POST /detalleFactura
 * @description Crea un nuevo detalle de factura en el sistema.
 * @middleware validarDetalleFactura - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarDetalleFactura, DetalleFacturaController.createDetalleFactura);

/**
 * @route PUT /detalleFactura/:id
 * @description Actualiza la información del detalle factura en el sistema.
 * @param {number} id - Identificador del detalle de la factura a actualizar.
 * @middleware validarDetalleFactura - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarDetalleFactura, DetalleFacturaController.updateDetalleFactura);

/**
 * @route DELETE /detalleFactura/:id
 * @description Elimina un detalle de factura factura por su ID.
 * @param {number} id - Identificador del detalle de la factura a eliminar.
 */
router.delete('/:id', DetalleFacturaController.deleteDetalleFactura);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;