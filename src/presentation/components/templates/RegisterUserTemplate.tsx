

import type { ReactNode } from "react";
import logoLight from "../../assets/logo-light.svg";

interface IRegisterUserTemplate {
  children: ReactNode;
}

export const RegisterUserTemplate: React.FC<IRegisterUserTemplate> = ({
  children
}) => {

  return (
    <main className="h-screen w-screen flex">
      <div className="h-full flex-1 flex items-center justify-center flex-col bg-stone-950">
        <img src={logoLight} alt="logoLight mind blog" />
        <h3 className="text-white">Inovação ao seu alcance</h3>
      </div>
      <div className="h-full flex-1 flex items-center justify-center text-white">
        {children}
      </div>
    </main>
  );
}
