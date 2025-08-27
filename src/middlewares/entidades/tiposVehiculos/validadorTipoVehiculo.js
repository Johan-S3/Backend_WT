import { campos } from "./campos.js";
import { validadorCampos } from "../../validadores/validadorCampos.js";
import { validadorParcial } from "../../validadores/validadorParcial.js";

// Validador para las peticiones POST y PUT
export const validarTipoVehiculo = validadorCampos(campos);

// Validador para las peticiones PATCH
export const validarTipoVehiculoParcial = validadorParcial(campos); 