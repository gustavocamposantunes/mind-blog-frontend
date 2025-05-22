

import { AuthHeader } from "@/presentation/components/molecules/AuthHeader";
import type { ReactNode } from "react";

interface INewPostTemplate {
  children: ReactNode;
}

export const NewPostTemplate: React.FC<INewPostTemplate> = ({
  children
}) => (
  <>
    <AuthHeader />
    <main className="px-[12%] mt-3">            
      {children}
    </main>
  </>
)