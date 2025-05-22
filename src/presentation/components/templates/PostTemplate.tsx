import { AuthHeader } from "@/presentation/components/molecules/AuthHeader"

import type { ReactNode } from "react";


interface IPostTemplate {
  children: ReactNode;
}

export const PostTemplate: React.FC<IPostTemplate> = ({
  children
}) => (
  <>
    <AuthHeader />
    <main className="px-[10%] mt-8">
      {children}
    </main>
  </>
)