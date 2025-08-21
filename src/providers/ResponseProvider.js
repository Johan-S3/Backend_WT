/**
 * Clase ResponseProvider
 * 
 * Esta clase proporciona métodos estáticos para estandarizar las respuestas 
 * JSON enviadas desde la API al cliente.
 * 
 * Beneficios:
 * - Unifica el formato de las respuestas.
 * - Facilita el manejo de mensajes de éxito y error.
 * - Mejora la legibilidad y consistencia en los controladores.
 */
export class ResponseProvider {

  /**
   * Envía una respuesta exitosa al cliente.
   *
   * @param {Object} res - Objeto de respuesta de Express.
   * @param {*} data - Información que se desea retornar (puede ser objeto, array o valor primitivo).
   * @param {string} [message="Operación exitosa"] - Mensaje descriptivo de la operación.
   * @param {number} [status=200] - Código de estado HTTP que indica éxito.
   * @returns {Object} Respuesta JSON con el formato estándar de éxito.
   * 
   * Ejemplo de salida:
   * {
   *   success: true,
   *   code: 200,
   *   message: "Operación exitosa",
   *   data: {...}
   * }
   */
  static success(res, data, message = "Operación exitosa", status = 200) {
    return res.status(status).json({
      success: true,
      code: status,
      message,
      data,
    });
  }

  /**
   * Envía una respuesta de error al cliente.
   *
   * @param {Object} res - Objeto de respuesta de Express.
   * @param {string} [message="Error interno del servidor"] - Mensaje que describe el error.
   * @param {number} [status=500] - Código de estado HTTP que indica el tipo de error.
   * @param {Array} [erros=[]] - Lista de errores detallados (por ejemplo: validaciones).
   * @returns {Object} Respuesta JSON con el formato estándar de error.
   * 
   * Ejemplo de salida:
   * {
   *   success: false,
   *   code: 400,
   *   message: "Error de validación",
   *   erros: ["El campo nombre es obligatorio"]
   * }
   */
  static error(res, message = "Error interno del servidor", status = 500, erros = []) {
    return res.status(status).json({
      success: false,
      code: status,
      message,
      erros: erros
    });
  }
}
