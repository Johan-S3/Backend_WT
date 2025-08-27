/**
 * Definición de los campos para la validación de la tabla relacional detalles_factura.
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
  { name: "id_factura", alias: "Factura", required: true, minLength: 1, maxLength: 10 },
  { name: "id_item_lavado", alias: "Item de lavado", required: true, minLength: 1, maxLength: 10 },
  { name: "nombre_item_snapshot", alias: "Nombre de item", required: true, minLength: 3, maxLength: 25 },
  { name: "cacntidad", alias: "Cantidad", required: true, minLength: 1, maxLength: 10 },
  { name: "precio_unitario", alias: "Precio unitario", required: true, minLength: 4, maxLength: 7 }
];
