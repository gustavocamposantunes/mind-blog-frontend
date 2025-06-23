import type { ReactNode } from "react";

import { AuthHeader } from "@/presentation/components/molecules/AuthHeader";

interface IProfileTemplate {
  children: ReactNode
}

export const ProfileTemplate: React.FC<IProfileTemplate> = ({
  children
}) => {
  return (
    <>
      <AuthHeader />
      <main className="px-[12%] mt-3">
        {children}
      </main>
    </>
  )
}