import { Link } from 'react-router-dom'

import type { ReactNode } from 'react'

interface IMenuItem extends React.LiHTMLAttributes<HTMLLIElement> {
  redirect: string
  children: ReactNode
  iconStart?: ReactNode
}

export const MenuItem: React.FC<IMenuItem> = ({
  redirect,
  className,
  children,
  iconStart,
}) => {
  return (
    <li className={`${iconStart ? 'flex gap-1' : null} ${className}`}>
      {iconStart}
      <Link to={redirect}>{children}</Link>
    </li>
  )
}
