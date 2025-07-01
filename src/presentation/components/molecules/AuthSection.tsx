import type { ReactNode } from 'react'

interface IAuthSection {
  title: string
  description: string
  children: ReactNode
}

export const AuthSection: React.FC<IAuthSection> = ({
  title,
  description,
  children,
}) => (
  <section className="flex flex-col px-8 md:px-24 lg:px-28 xl:px-44">
    <h2 className="text-2xl font-bold lg:text-center">{title}</h2>
    <p className="mt-1 text-lg lg:text-center">{description}</p>
    {children}
  </section>
)
