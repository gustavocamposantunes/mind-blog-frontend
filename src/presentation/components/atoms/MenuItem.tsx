import { Link } from 'react-router-dom'

import type { ReactNode } from 'react'

interface IMenuItem extends React.LiHTMLAttributes<HTMLLIElement> {
  redirect: string
  children: ReactNode
}

export const MenuItem: React.FC<IMenuItem> = ({
  redirect,
  className,
  children,
}) => {
  return (
    <li className={className}>
      <Link to={redirect}>{children}</Link>
    </li>
  )
}
