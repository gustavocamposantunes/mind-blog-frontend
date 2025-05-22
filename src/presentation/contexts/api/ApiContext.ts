import { createContext } from "react";

import type { AuthenticateUserModel } from "@/domain/models";

type Props = {
  setCurrentUser?: (user: AuthenticateUserModel | null) => void
  getCurrentUser?: () => AuthenticateUserModel 
  clearCurrentUser: () => void;
}

export default createContext<Props>({
  clearCurrentUser: function (): void {
    throw new Error("Function not implemented.");
  }
});
