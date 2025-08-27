/**
 * Definición de los campos para la validación de los tipos de lavados.
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
  { name: "nombre", alias: "Nombre", required: true, minLength: 3, maxLength: 25 },
  { name: "descripcion", alias: "Descripcion", required: true, minLength: 5, maxLength: 100 },
  { name: "id_tipo_vehiculo", alias: "Tipo de vehiculo", required: true, minLength: 1, maxLength: 10 },
];
