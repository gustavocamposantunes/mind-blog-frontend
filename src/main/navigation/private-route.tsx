import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/presentation/hooks";

interface IPrivateRoute {
  children: ReactNode
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  const { getCurrentUser } = useAuthStore();
  const hasAccessToken = typeof getCurrentUser === "function" && !!getCurrentUser().accessToken;
  return hasAccessToken ? <>{children}</> : <Navigate to="/" />;
};