import { AuthHeader } from "@/presentation/components/molecules/AuthHeader"

import type { ReactNode } from "react";


interface IPostsTemplate {
  children: ReactNode;
}

export const PostsTemplate: React.FC<IPostsTemplate> = ({
  children
}) => (
  <>
    <AuthHeader />
    <main className="px-[10%] mt-8">
      {children}
    </main>
  </>
)