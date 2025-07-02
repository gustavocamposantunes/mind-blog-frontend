import type { FormEvent, ReactNode } from 'react'

interface IAuthForm {
  onSubmit?: (event: FormEvent) => void
  children: ReactNode
}

export const AuthForm: React.FC<IAuthForm> = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="w-full flex lg:text-center flex-col">
    {children}
  </form>
)
