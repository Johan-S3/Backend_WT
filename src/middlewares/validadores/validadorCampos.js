import { ResponseProvider } from "../../providers/ResponseProvider.js";

/**
 * Middleware de validación general (completo).
 * 
 * Valida todos los campos definidos en el array de `campos` recibido:
 * - Que los campos obligatorios no estén vacíos.
 * - Que se cumplan las longitudes mínimas, máximas o exactas.
 * 
 * @function validadorCampos
 * @param {Array} campos - Definiciones de los campos a validar (provenientes de campos.js).
 * @returns {Function} Middleware de Express
 */
export function validadorCampos(campos) {
  return function (req, res, next) {
    const errors = [];

    for (const campo of campos) {
      const {
        name,      // nombre real del campo
        alias,     // nombre amigable para mensajes
        required,  // si es obligatorio
        minLength,
        maxLength,
      } = campo;

      const value = req.body[name];

      // Validar requeridos
      if (required && (!value || value.toString().trim() === "")) {
        errors.push({
          campo: name,
          message: `El campo ${alias} es obligatorio y no puede estar vacío.`,
        });
        continue;
      }

      // Validar longitudes (solo si hay valor)
      if (value) {
        if (minLength && maxLength && minLength === maxLength && value.length !== minLength) {
          errors.push({
            campo: name,
            message: `El campo ${alias} debe tener exactamente ${minLength} caracteres.`,
          });
          continue;
        }

        if (minLength && value.length < minLength) {
          errors.push({
            campo: name,
            message: `El campo ${alias} debe tener al menos ${minLength} caracteres.`,
          });
        }

        if (maxLength && value.length > maxLength) {
          errors.push({
            campo: name,
            message: `El campo ${alias} no puede tener más de ${maxLength} caracteres.`,
          });
        }
      }
    }

    // Si hay errores, retornamos la respuesta
    if (errors.length > 0) {
      return ResponseProvider.error(res, "Error de validación", 400, errors);
    }

    next();
  };
}
