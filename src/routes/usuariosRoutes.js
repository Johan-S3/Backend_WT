import express from "express";
import { validarContrasena, validarUsuario, validarUsuarioParcial } from "../middlewares/entidades/usuarios/validadorUsuario.js";
import UsuarioController from "../controllers/UsuarioController.js";


const router = express.Router();

/**
 * Rutas para la gestión de Usuarios.
 * 
 * Este enrutador define los endpoints principales para manejar los usuarios
 * dentro del sistema (CRUD). Cada ruta delega la lógica a un controlador
 * específico y puede incluir middlewares para validaciones.
 */

/**
 * @route GET /usuarios
 * @description Obtiene el listado completo de usuarios.
 */
router.get('/', UsuarioController.getAllUsuarios);

/**
 * @route GET /usuarios/gerentes
 * @description Obtiene el listado completo de usuarios gerentes. 
 */
router.get('/gerentes', UsuarioController.getAllGerentes);

/**
 * @route GET /usuarios/lavadores
 * @description Obtiene el listado completo de usuarios gerentes. 
 */
router.get('/lavadores', UsuarioController.getAllLavadores);

/**
 * @route GET /usuarios/:id
 * @description Obtiene el usuario por el id ingresado.
 * @param {number} id - Identificador del usuario a consultar.
 */
router.get('/:id', UsuarioController.getUsuarioById);

/**
 * @route POST /usuarios
 * @description Crea un nuevo usuario en el sistema.
 * @middleware validarUsuario - Valida los campos requeridos antes de ejecutar la acción.
 */
router.post('/', validarUsuario, UsuarioController.createUsuario);

/**
 * @route PUT /usuarios/:id
 * @description Actualiza la información de un usuario existente por su ID.
 * @param {number} id - Identificador del usuario a actualizar.
 * @middleware validarUsuario - Valida los campos requeridos antes de ejecutar la acción.
 */
router.put('/:id', validarUsuario, UsuarioController.updateUsuario);

/**
 * @route PATCH /usuarios/:id
 * @description Actualiza la información de un usuario existente por su ID.
 * @param {number} id - Identificador del usuario a actualizar.
 * @middleware validarContrasena - Valida los campos requeridos antes de ejecutar la acción.
 */
router.patch('/contrasena/:id', validarContrasena, UsuarioController.updatePasswordUsuario);

/**
 * @route DELETE /usuarios/:id
 * @description Elimina un usuario por su ID.
 * @param {number} id - Identificador del usuario a eliminar.
 */
router.delete('/:id', UsuarioController.deleteUsuario);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
