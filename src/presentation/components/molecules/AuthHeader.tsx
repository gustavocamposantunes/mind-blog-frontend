import { Button } from "@/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu"
import { CustomAvatar } from "@/presentation/components/molecules/CustomAvatar";
import { ApiContext } from "@/presentation/contexts";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import logoDark from "../../assets/logo-dark.svg";
import { MenuItem } from "../atoms/MenuItem";

export const AuthHeader = () => {
  const navigate = useNavigate()
  const context = useContext(ApiContext)

  const isLoggedIn = () => context && typeof context.getCurrentUser === "function" && context.getCurrentUser()

  return (
    <header className="w-full flex justify-between px-[10%] pt-4">
      <a onClick={() => navigate("/")}><img src={logoDark} alt="" /></a>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <MenuItem redirect="/">Home</MenuItem>
          <MenuItem className="pr-4" redirect="/posts">Artigos</MenuItem>

          {isLoggedIn() 
            ? 
              <MenuItem className="border-l-2 border-l-stone-700 pl-6" redirect="/post/new">Publicar</MenuItem>
            : 
              <MenuItem className="border-l-2 border-l-stone-700 pl-6" redirect="/login">Entrar</MenuItem>
          }
        </ul>
        {isLoggedIn()
          ? 
            <span className="ml-8">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CustomAvatar />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                >
                  Perfil
                </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      context.clearCurrentUser();
                      window.location.reload();
                    }}
                  >
                    Desconectar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          : 
          <Button onClick={() => navigate("/register")} className="action-btn ml-6">Registrar</Button>
        }
      </nav>
    </header>
  )
}