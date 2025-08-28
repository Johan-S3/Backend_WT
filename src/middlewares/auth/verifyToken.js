import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { verificarAccessToken } from "../../utils/jwt.js";

export function verifyToken(req, res, next) {
    try { // Intentamos verificar el token; cualquier fallo va al catch

        const header = req.headers.authorization || ""; // Leemos el header Authorization; si no existe usamos cadena vacía
        const [type, token] = header.split(" "); // Separa en ["Bearer", "<token>"] si viene en el formato esperado

        // Si no es tipo Bearer o no hay token
        if (type !== "Bearer" || !token) {
            // Respondemos 401 y detenemos la ejecución
            return ResponseProvider.error(
                res,
                "No autenticado",
                401
            );
        }

        const payload = verificarAccessToken(token); // Verifica firma/expiración y devuelve el payload decodificado (lanza si inválido)

        req.user = payload; // Guardamos el payload en req.user para que los controladores/middlewares posteriores lo usen

        next(); // Token válido → continuar al siguiente middleware/handler
    } catch (err) {
        return ResponseProvider.error(
            res,
            "Token inválido o expirado",
            401
        ); // Respondemos 401 con mensaje de token inválido/expirado
    }
}
