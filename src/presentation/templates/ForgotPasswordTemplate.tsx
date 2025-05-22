import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";

import { useNavigate } from "react-router-dom";

import logoLight from "../assets/logo-light.svg";

export const ForgotPasswordTemplate = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-screen flex">
      <div className="h-full flex-1 flex items-center justify-center flex-col bg-stone-950">
        <img src={logoLight} alt="logoLight mind blog" />
        <h3 className="text-white">Inovação ao seu alcance</h3>
      </div>
      <div className="h-full flex-1 flex items-center justify-center text-white">
        <form action="" className="w-full flex items-center flex-col gap-6 px-[20%]">
            <h2 className="text-stone-950 text-[24px]">Esqueci a senha</h2>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-stone-950">Email</Label>
              <Input type="email" id="email" placeholder="Digite seu email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password" className="text-stone-950">Senha</Label>
              <Input type="password" id="password" placeholder="Digite sua senha" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password-confirmation" className="text-stone-950">Confirmar senha</Label>
              <Input type="password" id="password-confirmation" placeholder="Confirme sua senha" />
            </div>
          <Button className="mt-4 w-full py-4 bg-stone-950 auth-btn" type="submit">Alterar</Button>
            <a onClick={() => navigate("/login")}>Já tem cadastro? Clique aqui</a>
        </form>
      </div>
    </main>
  );
}
