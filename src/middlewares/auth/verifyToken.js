import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { verificarAccessToken } from "../../utils/jwt.js";

export function verifyToken(req, res, next) {
  try {
    // Obtener el accessToken de la cookie
    const token = req.cookies.accessToken;

    // Si no hay token, rechazamos
    if (!token) {
      return ResponseProvider.error(
        res,
        "No autenticado",
        401
      );
    }

    // Verificar la firma y expiración del token
    verificarAccessToken(token);
    // 👆 si el token es inválido/expirado, lanza excepción y se va al catch

    next();
  } catch (err) {
    return ResponseProvider.error(
      res,
      "Token inválido o expirado",
      401
    );
  }
}
