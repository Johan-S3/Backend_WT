/**
 * Definición de los campos para la validación de Permisos.
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
  {  name: "nombre_permiso", alias: "Nombre", required: true, minLength: 3, maxLength: 35 },
  {  name: "descripcion_permiso", alias: "Descripción", required: true, minLength: 5, maxLength: 50 }
];
