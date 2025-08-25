import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function parcialesUsuario(req, res, next) {
  const errors = [];
  // Capturamos los campos del body de la petición
  const bodyKeys = Object.keys(req.body);
  // Validar que el body no esté vacío
  const camposPermitidos = campos.map((c) => c.name);
  
  // Validar que al menos un campo permitido esté presente
  const camposPresentes = bodyKeys.filter((key) =>
    camposPermitidos.includes(key)
  );

  
  // Si no hay campos presentes, devolver un error
  if (camposPresentes.length === 0) {
    return ResponseProvider.error(
      res,
      "Debe enviar al menos un campo válido para actualizar",
      400
    );
  }

  // Recorremos las reglas de validación definidas en campos.js
  for (const campo of campos) {
    const {
      name,      // Nombre del campo a validar (ej: nombre_permiso)
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

    // Validar longitud exacta
    if (minLength == maxLength && value.length != minLength) {
      errors.push({
        campo: name,
        message: `El campo ${alias} debe tener exactamente ${minLength} caracteres.`,
      });
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