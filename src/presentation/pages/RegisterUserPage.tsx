import { RegisterUserTemplate } from "@/presentation/components/templates"
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";

import type { RegisterUserUseCase } from "@/domain/usecases";
import { useRegisterUser } from "../hooks";
import { ApiContext } from "../contexts";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

type RegisterUserProps = {
  registerUser: RegisterUserUseCase
}

export const RegisterUserPage: React.FC<RegisterUserProps> = ({
  registerUser
}) => {
  const navigate = useNavigate();
  const context = useContext(ApiContext);

  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [registerUserParams, setRegisterUserParams] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });

  const { mutate, status, error } = useRegisterUser(registerUser)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (registerUserParams.password !== registerUserParams.passwordConfirmation) {
      setPasswordMismatchError(true);
      return;
    }

    setPasswordMismatchError(false);

    mutate(registerUserParams, {
      onSuccess: (response) => {
        if (
          context &&
          typeof context.setCurrentUser === "function" &&
          response !== undefined
        ) {
          navigate("/");
          context.setCurrentUser(response);
        }
      }
    });
  }

  return (
    <RegisterUserTemplate>
      <form onSubmit={handleSubmit} className="w-full flex items-center flex-col gap-6 px-[20%]">
          <h2 className="text-stone-950 text-[24px]">Registrar</h2>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-stone-950">Nome</Label>
            <Input 
              type="name" 
              id="name" 
              placeholder="Digite seu nome"
              onChange={(event) => {
                setRegisterUserParams({
                  ...registerUserParams,
                  name: event.target.value
                })
              }} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-stone-950">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Digite seu email" 
              onChange={(event) => {
                setRegisterUserParams({
                  ...registerUserParams,
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
              onChange={(event) => {
                setRegisterUserParams({
                  ...registerUserParams,
                  password: event.target.value
                })
              }} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password-confirmation" className="text-stone-950">Confirmar senha</Label>
            <Input 
              type="password"
              id="password-confirmation" 
              placeholder="Confirme sua senha"
              onChange={(event) => {
                setRegisterUserParams({
                  ...registerUserParams,
                  passwordConfirmation: event.target.value
                })
              }} 
            />
            {passwordMismatchError && (
              <p className="text-sm text-red-500 -mt-2">
                As senhas não coincidem
              </p>
            )}
          </div>
          <Button 
            className="mt-4 w-full py-4 bg-stone-950 auth-btn" 
            type="submit"
          >
            {status === "pending" ? "Carregando..." : "Criar Conta"}
          </Button>

          {error && <p className="text-red-500">{error.name}</p>}

          <a onClick={() => navigate("/login")}>Já tem cadastro? Clique aqui</a>
      </form>
    </RegisterUserTemplate>
  )
}