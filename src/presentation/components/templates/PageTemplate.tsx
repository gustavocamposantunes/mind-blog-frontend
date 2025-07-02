import type { ReactNode } from 'react'

import { Header } from '@/presentation/components/molecules'
import { useAuthStore } from '@/presentation/store'

interface IPageTemplate {
  children: ReactNode
}

export const PageTemplate: React.FC<IPageTemplate> = ({ children }) => {
  const store = useAuthStore()
  return (
    <>
      <Header store={store} />
      <main className="px-4 md:px-[10%] mt-8">{children}</main>
    </>
  )
}
