import { Textarea } from "@/presentation/components/ui/textarea";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu"
import { CustomAvatar } from "@/presentation/components/molecule/CustomAvatar";

import logoDark from "../assets/logo-dark.svg";

export const NewArticleTemplate = () => (
  <>
    <header className="w-full flex justify-between px-[10%] pt-4">
      <img src={logoDark} alt="" />
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li><a href="">Home</a></li>
          <li className="pr-4"><a href="">Artigos</a></li>
          <li className="border-l-2 border-l-stone-700 pl-6"><a href="">Publicar</a></li>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CustomAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Desconectar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
    <main className="px-[12%] mt-3">
      <section className="flex justify-between w-full">
        <h2>Novo Artigo</h2>
        <span className="flex gap-2">
          <Button className="cancel-btn action-btn">Cancelar</Button>
          <Button className="action-btn">Salvar</Button>
        </span>
      </section>
      <section className="mt-4">
        <form className="w-full flex flex-col gap-4" action="">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Título</Label>
            <Textarea placeholder="Adicione um título" id="message" />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Texto</Label>
            <Textarea className="min-h-[400px]" placeholder="Escreva seu artigo" id="message" />
          </div>
        </form>
      </section>
    </main>
  </>
)