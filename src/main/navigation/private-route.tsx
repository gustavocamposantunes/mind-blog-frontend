import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/presentation/store/auth-store";

interface IPrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
