import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import rolesRoutes from "./src/routes/rolesRoutes.js";
import permisosRoutes from "./src/routes/permisosRoutes.js";
import permisosRolesRoutes from "./src/routes/permisosRolesRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";
import tiposVehiculosRoutes from "./src/routes/tiposVehiculosRoutes.js";
import serviciosVehiculosRoutes from "./src/routes/serviciosVehiculosRoutes.js";
import vehiculosRoutes from "./src/routes/vehiculosRoutes.js";
import vehiculosUsuariosRoutes from "./src/routes/vehiculosUsuariosRoutes.js";
import tiposLavadosRoutes from "./src/routes/tiposLavadosRoutes.js";
import itemsLavadosRoutes from "./src/routes/itemsLavadosRoutes.js";
import itemsTiposLavadosRoutes from "./src/routes/itemsTiposLavadosRoutes.js";
import estadosRoutes from "./src/routes/estadosRoutes.js";
import lavadosRoutes from "./src/routes/lavadosRoutes.js";
import facturasRoutes from "./src/routes/facturasRoutes.js";


dotenv.config();

/**
 * Archivo principal de configuración y arranque del servidor.
 * 
 * Aquí se inicializa la aplicación de Express, se configuran los 
 * middlewares globales, se definen las rutas y se levanta el servidor 
 * en el puerto especificado en las variables de entorno o por defecto en 3000.
 */

// Crear la instancia principal de Express
const app = express();

// Middleware para habilitar CORS (permite peticiones desde otros dominios)
app.use(cors());

// Middleware para procesar datos en formato JSON
app.use(bodyParser.json());
// Alternativa moderna: app.use(express.json());

// Middleware para procesar datos en formato URL-encoded (formularios)
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar cookies en las solicitudes/respuestas
app.use(cookieParser());

// Rutas principales de la aplicación
app.use("/roles", rolesRoutes); // Gestión de roles
app.use("/permisos", permisosRoutes); // Gestión de permisos
app.use("/permisosRoles", permisosRolesRoutes); // Gestión de permisos_roles
app.use("/usuarios", usuariosRoutes); // Gestión de usuarios
app.use("/tiposVehiculos", tiposVehiculosRoutes); // Gestión de tipos de vehiculos
app.use("/serviciosVehiculos", serviciosVehiculosRoutes); // Gestión de servicios de vehiculos
app.use("/vehiculos", vehiculosRoutes); // Gestión de vehiculos
app.use("/vehiculosUsuarios", vehiculosUsuariosRoutes); // Gestión de vehiculos_usuarios
app.use("/tiposLavados", tiposLavadosRoutes); // Gestión de tipos de lavados
app.use("/itemsLavados", itemsLavadosRoutes); // Gestión de items de lavados
app.use("/itemsTiposLavados", itemsTiposLavadosRoutes); // Gestión de la tabla relacional entre los tipos y items de lavados
app.use("/estados", estadosRoutes); // Gestión de estados
app.use("/lavados", lavadosRoutes); // Gestión de lavados
app.use("/facturas", facturasRoutes); // Gestión de facturas

// Puerto donde se ejecutará el servidor (por defecto 3000)
const port = process.env.PORT || 3000;

// Inicializa el servidor y lo deja escuchando en el puerto definido
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
