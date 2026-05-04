import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export function PrivateRoute() {
  const token = useAuthStore(state => state.token);
  const payload = useAuthStore(state => state.payload);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está cargando el payload, permitimos que se quede donde está por ahora (o podrías poner un spinner)
  if (payload) {
    const isDeactivated = !!payload.deleteAfter;
    
    // Si está desactivado y no está en la vista de recuperar, forzar redirección
    if (isDeactivated && location.pathname !== "/recuperar-cuenta") {
      return <Navigate to="/recuperar-cuenta" replace />;
    }

    // Si NO está desactivado y trata de entrar a recuperar, devolver a la agenda
    if (!isDeactivated && location.pathname === "/recuperar-cuenta") {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}