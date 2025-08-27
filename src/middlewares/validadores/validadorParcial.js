import { ResponseProvider } from "../../providers/ResponseProvider.js";

/**
 * Middleware de validación parcial.
 * 
 * Se construye dinámicamente según los campos permitidos que se pasen como parámetro.
 * 
 * @param {Array} campos - Lista de definiciones de campos a validar (desde campos.js).
 * @returns {Function} Middleware de Express que valida los campos presentes en req.body.
 */
export function validadorParcial(campos) {
  return (req, res, next) => {
    const errors = [];

    // Obtenemos solo las claves que llegan en el body
    const camposPresentes = Object.keys(req.body);

    if (!camposPresentes) return;

    // Recorremos cada campo que llegó en el body
    for (const campoName of camposPresentes) {
      // Buscamos si existe la definición de ese campo en campos.js
      const campoDef = campos.find(c => c.name === campoName);

      // Si no está definido en campos.js, lo ignoramos
      if (!campoDef) continue;

      const valor = req.body[campoName];

      // Validación: si el valor está vacío y era requerido
      if (campoDef.requerido && (valor === undefined || valor === "")) {
        errors.push(`El campo ${campoDef.alias} es obligatorio`);
        continue;
      }

      // Validación: si hay un valor, verificamos longitudes
      if (valor !== undefined && valor !== "") {
        if (
          campoDef.maxLength === campoDef.minLength &&
          (valor.length > campoDef.maxLength || valor.length < campoDef.minLength)
        ) {
          errors.push(
            `El campo ${campoDef.alias} debe tener exactamente ${campoDef.minLength} caracteres`
          );
          continue;
        }
        if (valor.length < campoDef.minLength) {
          errors.push(
            `El campo ${campoDef.alias} debe tener al menos ${campoDef.minLength} caracteres`
          );
        }
        if (valor.length > campoDef.maxLength) {
          errors.push(
            `El campo ${campoDef.alias} debe tener máximo ${campoDef.maxLength} caracteres`
          );
        }
      }
    }

    // Si hay errores, retornamos respuesta de error
    if (errors.length > 0) {
      return ResponseProvider.error(res, "Error de validación", 400, errors);
    }

    // Si no hubo errores, pasamos al siguiente middleware/controlador
    next();
  };
}
