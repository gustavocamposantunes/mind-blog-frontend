import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";

export const LoginTemplate = () => {
  const navigate = useNavigate();
  return (
  <main className="h-screen w-screen flex">
    <div className="h-full flex-1 flex items-center justify-center flex-col bg-stone-950">
      <img src={logo} alt="logo mind blog" />
      <h3 className="text-white">Inovação ao seu alcance</h3>
    </div>
    <div className="h-full flex-1 flex items-center justify-center text-white">
       <form action="" className="w-full flex items-center flex-col gap-6 px-[20%]">
          <h2 className="text-stone-950 text-[24px]">Conectar</h2>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-stone-950">Email</Label>
            <Input type="email" id="email" placeholder="Digite seu email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password" className="text-stone-950">Senha</Label>
            <Input type="password" id="password" placeholder="Digite sua senha" />
          </div>
          <div className="w-full flex justify-end">
            <a href="#" className="text-sm text-stone-950 hover:underline">Esqueceu a senha?</a>
          </div>
          <Button className="mt-4 w-full py-4 bg-stone-950" type="submit">Entrar</Button>
          <a onClick={() => navigate("/register")}>Novo usuário? Clique aqui</a>
       </form>
    </div>
  </main>
);
}
