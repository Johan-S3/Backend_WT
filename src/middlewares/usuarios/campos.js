/**
 * Definición de los campos para la validación de Usuarios.
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
  { name: "cedula", alias: "Cedula", required: true, minLength: 6, maxLength: 10 },
  { name: "nombre", alias: "Nombre", required: true, minLength: 3, maxLength: 40 },
  { name: "telefono", alias: "Telefono", required: true, minLength: 10, maxLength: 10 },
  { name: "correo", alias: "Correo", required: true, minLength: 6, maxLength: 50 },
  { name: "id_rol", alias: "ID rol", required: true, minLength: 1, maxLength: 10 },
  { name: "contrasena", alias: "Contraseña", required: false, minLength: 8, maxLength: 20 }
];
