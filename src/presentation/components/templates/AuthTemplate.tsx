import { BrandLogo } from '../atoms'

import type { ReactNode } from 'react'

interface IAuthTemplate {
  children: ReactNode
}

export const AuthTemplate: React.FC<IAuthTemplate> = ({ children }) => (
  <main className="h-screen w-screen flex flex-col lg:flex-row">
    <div className="py-10 md:py-8 xl:h-full lg:flex-1 flex items-center justify-center flex-col bg-stone-950">
      <BrandLogo
        className="items-center"
        tagline="Inovação ao seu alcance"
      />
    </div>
    <div className="h-full py-10 md:py-12 flex-1 flex lg:items-center justify-center text-white">
      {children}
    </div>
  </main>
)
