import { ResponseProvider } from "../../providers/ResponseProvider.js";

export function verifyPermiso(permisoRequerido) {
  return (req, res, next) => {
    const permisosUsuario = req.cookies.permisos;

    if (!permisosUsuario.includes(permisoRequerido)) {
      return ResponseProvider.error(
        res,
        "No tienes permiso para realizar esta acción",
        403,
        null
      );
    }

    next();
  };
}
