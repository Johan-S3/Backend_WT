import { ResponseProvider } from "../../providers/ResponseProvider.js";

export function validarLogin(req, res, next) {
  const errors = [];
  console.log(req.body);

  const { cedula, contrasena } = req.body;

  // Creo la expresion regular para validar la cedula ingresada.
  const ContrasenaReGex = /^\d+$/;
  // Se valida si no hay numero de cedula o si no cumple con la expresion regular.
  if (!cedula || !ContrasenaReGex.test(cedula.toString())) {
    errors.push({
      campo: "Cedula",
      message: "La cédula es obligatoria y solo números"
    });
  }

  // // Mínimo 8 con al menos 1 letra y 1 número (ajusta si quieres)
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/;
  // // Se valida si no hay contraseña o no cumple con la expresion regular.
  // if (!contrasena || !passwordRegex.test(contrasena)) {
  //   errors.push({
  //     campo: "Contrasena",
  //     message: "Contraseña inválida (Al menos una letra y numero. Min 8 caracteres)"
  //   });
  // }

  // Si el arreglo errores tiene longitud mayor a 0. Es decir, hay errores...
  if (errors.length) {
    console.log(errors);

    // Muestra los errores
    return ResponseProvider.error(
      res,
      "Error de validación en login",
      400,
      errors
    );
  }

  next();
}
