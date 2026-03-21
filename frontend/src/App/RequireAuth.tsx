// src/App/RequireAuth.tsx
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  token: string | null;
};

export function RequireAuth({ token }: Props) {
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />; // renderizza solo i figli se loggato
}
