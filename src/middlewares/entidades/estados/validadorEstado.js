import { campos } from "./campos.js";
import { validadorCampos } from "../../validadores/validadorCampos.js";
import { validadorParcial } from "../../validadores/validadorParcial.js";

// Validador para las peticiones POST y PUT
export const validarEstado = validadorCampos(campos);

// Validador para las peticiones PATCH
export const validarEstadoParcial = validadorParcial(campos); 