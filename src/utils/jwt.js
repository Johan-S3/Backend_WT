import jwt from "jsonwebtoken";

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION,
  REFRESH_EXPIRATION,
} = process.env;

export function generarAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
}

export function generarRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRATION });
}

export function verificarAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET); // lanza si no es válido
}

export function verificarRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET); // lanza si no es válido
}
