import React, { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import { ApiContext } from "@/presentation/contexts";

interface IPrivateRoute {
  children: ReactNode
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  const { getCurrentUser } = useContext(ApiContext);
  const hasAccessToken = typeof getCurrentUser === "function" && !!getCurrentUser()?.accessToken;
  return hasAccessToken ? <>{children}</> : <Navigate to="/" />;
};