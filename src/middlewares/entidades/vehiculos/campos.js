/**
 * Definición de los campos para la validación de Vehiculos.
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
  { name: "placa", alias: "Placa", required: true, minLength: 5, maxLength: 6 },
  { name: "marca_vehiculo", alias: "Marca del vehiculo", required: true, minLength: 3, maxLength: 20 },
  { name: "modelo_vehiculo", alias: "Modelo del vehiculo", required: true, minLength: 4, maxLength: 4 },
  { name: "clave", alias: "Clave del vehiculo", required: false, minLength: 0, maxLength: 10 },
  { name: "id_tipo_vehiculo", alias: "Tipo de vehiculo", required: true, minLength: 1, maxLength: 10 },
  { name: "id_servicio_vehiculo", alias: "Tipop de servicio", required: true, minLength: 1, maxLength: 10 }
];
