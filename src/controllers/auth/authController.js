import { ResponseProvider } from "../../providers/ResponseProvider.js";
import AuthService from "../../services/auth/AuthService.js";

export const login = async (req, res) => {
    const { cedula, contrasena } = req.body;
    const resp = await AuthService.login(cedula, contrasena);
    if (resp.error) {
        return ResponseProvider.error(
            res,
            resp.message,
            resp.code
        );
    }
    return ResponseProvider.success(
        res,
        resp.data,
        resp.message,
        resp.code
    );
};

export const refreshToken = async (req, res) => {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
        return ResponseProvider.error(
            res,
            "Refresh token no enviado",
            401
        );
    }
    const resp = await AuthService.refresh(token);
    if (resp.error) {
        return ResponseProvider.error(
            res,
            resp.message,
            resp.code
        );
    }
    return ResponseProvider.success(
        res,
        resp.data,
        resp.message,
        resp.code
    );
};

export const logout = async (_req, res) => {
    const resp = await AuthService.logout();
    return ResponseProvider.success(
        res,
        null,
        resp.message,
        resp.code
    );
};
