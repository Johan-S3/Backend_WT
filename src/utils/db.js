/**
 * Módulo de conexión a la base de datos MySQL.
 * 
 * Este archivo establece la conexión con la base de datos utilizando la librería `mysql2/promise`
 * y las credenciales almacenadas en el archivo `.env`. 
 * 
 * La conexión se exporta para ser utilizada en todo el proyecto,
 * permitiendo realizar consultas a la base de datos de manera centralizada.
 */

import mysql from "mysql2/promise"; // Importa el cliente MySQL con soporte de promesas
import dotenv from 'dotenv';        // Maneja las variables de entorno desde el archivo .env

// Carga las variables de entorno definidas en el archivo .env
dotenv.config();

/**
 * Se crea la conexión a la base de datos MySQL usando las credenciales definidas en .env.
 * 
 * Variables utilizadas:
 * - DB_HOST: Dirección del servidor de la base de datos
 * - DB_USER: Usuario autorizado en la base de datos
 * - DB_PASSWORD: Contraseña del usuario
 * - DB_NAME: Nombre de la base de datos a utilizar
 */
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,       // Servidor donde se aloja la BD
    user: process.env.DB_USER,       // Usuario de conexión
    password: process.env.DB_PASSWORD, // Contraseña del usuario
    database: process.env.DB_NAME    // Base de datos a la que se conectará
});

// Exporta la conexión para ser utilizada en otros módulos del proyecto
export default connection;
