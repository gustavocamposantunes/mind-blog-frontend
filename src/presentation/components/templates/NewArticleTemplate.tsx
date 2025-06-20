

import { AuthHeader } from "@/presentation/components/molecules/AuthHeader";
import type { ReactNode } from "react";

interface INewArticleTemplate {
  children: ReactNode;
}

export const NewArticleTemplate: React.FC<INewArticleTemplate> = ({
  children
}) => (
  <>
    <AuthHeader />
    <main className="px-[12%] mt-3">            
      {children}
    </main>
  </>
)