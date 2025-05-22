import type { AuthenticateUserUseCase } from "@/domain/usecases/AuthenticateUserUseCase";

import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";

import { LoginTemplate } from "../components/templates";
import { useAuthenticateUser } from "../hooks";

import { useState } from "react";

import { useNavigate } from "react-router-dom";


type LoginPageProps = {
  authenticateUser: AuthenticateUserUseCase;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  authenticateUser
}) => {
  const navigate = useNavigate();


  const [authParams, setAuthParams] = useState({ 
    email: "",
    password: "" 
  });

  const { mutate, status, error } = useAuthenticateUser(authenticateUser);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(authParams, {
      onSuccess: () => {
        navigate("/");
      }
    });
  };

  return (
    <LoginTemplate>
      <form onSubmit={handleSubmit} action="" className="w-full flex items-center flex-col gap-6 px-[20%]">
          <h2 className="text-stone-950 text-[24px]">Conectar</h2>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-stone-950">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Digite seu email" 
              value={authParams.email} 
              onChange={(event) => {
                setAuthParams({
                  ...authParams,
                  email: event.target.value
                })
              }}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password" className="text-stone-950">Senha</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
              value={authParams.password} 
              onChange={(event) => {
                setAuthParams({
                  ...authParams,
                  password: event.target.value
                })
              }}
            />
          </div>
          <div className="w-full flex justify-end">
            <a 
              onClick={() => navigate("/forgot-password")} 
              className="text-sm text-stone-950 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Button 
            className="mt-4 w-full py-4 auth-btn" 
            type="submit"
          >
            {status === "pending" ? "Carregando..." : "Entrar"}
          </Button>

          {error && <p className="text-red-500">{error.name}</p>}

          <a 
            onClick={() => navigate("/register")}
          >
            Novo usuário? Clique aqui
          </a>
       </form>
    </LoginTemplate>
  )
}