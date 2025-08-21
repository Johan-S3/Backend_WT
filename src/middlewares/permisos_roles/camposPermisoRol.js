import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

/**
 * Middleware de validación para los campos de PermisosRol.
 * 
 * Este middleware recorre las reglas definidas en `campos.js` y valida:
 * - Que los campos obligatorios no estén vacíos.
 * - Que se cumpla la longitud mínima y máxima de caracteres.
 * 
 * En caso de que se detecten errores, se detiene la ejecución y se 
 * responde con un error estandarizado a través de `ResponseProvider.error`.
 * 
 * Si no hay errores, se permite continuar al siguiente middleware o controlador.
 *
 * @function camposPermisoRol
 * @param {Object} req - Objeto de solicitud de Express (contiene los datos enviados por el cliente).
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware o controlador.
 */
export function camposPermisoRol(req, res, next) {
  // Arreglo para almacenar los errores de validación
  const errors = [];

  // Recorremos las reglas de validación definidas en campos.js
  for (const campo of campos) {
    const {
      name,      // Nombre del campo a validar (ej: id_permiso)
      alias,     // Alias descriptivo (ej: Nombre)
      required,  // Si el campo es obligatorio
      minLength, // Longitud mínima permitida
      maxLength, // Longitud máxima permitida
    } = campo;

    const value = req.body[name];

    // Validar si el campo es requerido y está vacío
    if (required && (!value || value.toString().trim() === "")) {
      errors.push({
        campo: name,
        message: `El campo ${alias} es obligatorio y no puede estar vacío.`,
      });
      // Se omite el resto de validaciones y se pasa al siguiente campo
      continue;
    }

    // Validar longitud mínima
    if (minLength && value && value.length < minLength) {
      errors.push({
        campo: name,
        message: `El campo ${alias} debe tener al menos ${minLength} caracteres.`,
      });
      continue;
    }

    // Validar longitud máxima
    if (maxLength && value && value.length > maxLength) {
      errors.push({
        campo: name,
        message: `El campo ${alias} no puede tener más de ${maxLength} caracteres.`,
      });
      continue;
    }
  }

  // Si existen errores, devolverlos en una respuesta estandarizada
  if (errors.length > 0) {
    return ResponseProvider.error(
      res,
      "Error de validación",
      400,
      errors
    );
  }

  // Si no hubo errores, continuar con el siguiente middleware/controlador
  next();
}
