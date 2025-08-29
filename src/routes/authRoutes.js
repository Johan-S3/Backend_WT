import express from "express";
import { login, logout, refreshToken } from "../controllers/auth/authController.js";
import { validarLogin } from "../middlewares/auth/validadorLogin.js";
import { verifyToken } from "../middlewares/auth/verifyToken.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  return ResponseProvider.success(res, undefined, "Sesión válida. Acceso autorizado", 200);
});

router.post("/login", validarLogin, login);
router.get("/refresh", refreshToken);
router.get("/logout", verifyToken, logout);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
