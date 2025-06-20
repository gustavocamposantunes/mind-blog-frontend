import { AuthHeader } from "@/presentation/components/molecules/AuthHeader";
import type { ReactNode } from "react";

interface IArticleTemplate {
  children: ReactNode;
}

export const ArticleTemplate: React.FC<IArticleTemplate> = ({
  children
}) => (
  <>
    <AuthHeader />
    <main className="px-[10%] mt-8">
      {children}
    </main>
  </>
)