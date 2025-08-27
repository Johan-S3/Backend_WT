import { campos, camposContrasena } from "./campos.js";
import { validadorCampos } from "../../validadores/validadorCampos.js";
import { validadorParcial } from "../../validadores/validadorParcial.js";

// Validador para las peticiones POST y PUT
export const validarUsuario = validadorCampos(campos);

// Validador para las peticiones PATCH
export const validarUsuarioParcial = validadorParcial(campos); 

// Validador para el cambio de contraseña
export const validarContrasena = validadorParcial(camposContrasena); 