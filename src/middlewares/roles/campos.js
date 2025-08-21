/**
 * Definición de los campos para la validación de Roles.
 * 
 * Cada objeto dentro del arreglo `campos` describe las reglas de validación 
 * para un campo específico. Esto permite centralizar y reutilizar las reglas 
 * en los middlewares de validación.
 * 
 * Propiedades:
 * - name: Nombre del campo en la base de datos o en el request.
 * - alias: Nombre descriptivo (usado en mensajes de error o validaciones).
 * - required: Indica si el campo es obligatorio.
 * - minLength: Longitud mínima permitida para el valor.
 * - maxLength: Longitud máxima permitida para el valor.
 */
export const campos = [
  { 
    name: "nombre_rol",   // Nombre del campo en la BD y request
    alias: "Nombre",      // Alias legible para mostrar en mensajes
    required: true,       // Campo obligatorio
    minLength: 3,         // Longitud mínima del valor
    maxLength: 35         // Longitud máxima del valor
  }
];
