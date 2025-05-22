import { createContext } from "react";

import type { AuthenticateUserModel } from "@/domain/models";

type Props = {
  setCurrentUser?: (user: AuthenticateUserModel) => void
  getCurrentUser?: () => AuthenticateUserModel 
}

export default createContext<Props>({});
