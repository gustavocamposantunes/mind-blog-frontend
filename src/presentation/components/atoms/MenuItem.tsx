import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IMenuItem extends React.LiHTMLAttributes<HTMLLIElement> {
  redirect: string;
  children: ReactNode;
}

export const MenuItem: React.FC<IMenuItem> = ({ redirect, className, children }) => {
  const navigate = useNavigate();
  return (
    <li 
      className={className}
    >
      <a onClick={() => navigate(redirect)}>
        {children}
      </a>
    </li>
  )
}