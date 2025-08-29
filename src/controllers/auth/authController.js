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

  const { dataUser, accessToken, refreshToken, permisos } = resp.data;

  // Seteamos cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "lax"
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: false,
    sameSite: "lax"
  });

  res.cookie("permisos", JSON.stringify(permisos), {
    httpOnly: false,
    secure: false,
    sameSite: "lax"
  });

  return ResponseProvider.success(
    res,
    dataUser,
    resp.message,
    resp.code
  );
};

export const refreshToken = async (req, res) => {
  const refreshTokenRec = req.cookies.refreshToken;

  if (!refreshTokenRec) {
    return ResponseProvider.error(
      res,
      "Refresh token no enviado",
      401
    );
  }
  const resp = await AuthService.refresh(refreshTokenRec);
  if (resp.error) {
    return ResponseProvider.error(
      res,
      resp.message,
      resp.code
    );
  }

  const { accessToken, refreshToken } = resp.data;

  // ✅ Actualizar cookie con el nuevo accessToken
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
  });

  // ✅ Actualizar cookie con el nuevo refreshToken
  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
  });

  return ResponseProvider.success(
    res,
    null,
    resp.message,
    resp.code
  );
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("permisos");
  res.clearCookie("usuario");

  const resp = await AuthService.logout();

  return ResponseProvider.success(
    res,
    null,
    resp.message,
    resp.code
  );
};
