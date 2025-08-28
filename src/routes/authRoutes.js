import express from "express";
import { login, logout, refreshToken } from "../controllers/auth/authController.js";
import { validarLogin } from "../middlewares/auth/validadorLogin.js";
import { verifyToken } from "../middlewares/auth/verifyToken.js";

const router = express.Router();

router.post("/login", validarLogin, login);
router.post("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);

// Exporta el router para ser utilizado en el archivo principal de rutas
export default router;
