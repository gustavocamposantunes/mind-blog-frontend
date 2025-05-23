import { AuthHeader } from "@/presentation/components/molecules/AuthHeader";
import { FormHeaderAction } from "@/presentation/components/molecules/FormHeaderAction";
import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";

export const ProfileTemplate = () => (
  <>
    <AuthHeader />
    <main className="px-[12%] mt-3">
      <form className="w-full flex flex-col gap-6">
        <FormHeaderAction title="Editar Perfil" /> 
        <section className="mt-4 flex flex-col gap-4">
          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Inserir Imagem</Label>
              <Input id="picture" type="file" />
            </div>
            <img className="w-72" src="https://avatars.githubusercontent.com/u/13971720?v=4" alt="foto selecionada" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-stone-950">Nome</Label>
            <Input 
              type="name" 
              id="name" 
              placeholder="Digite seu nome"
              value="Gustavo"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="surrname" className="text-stone-950">Sobrenome</Label>
            <Input 
              type="surrname" 
              id="surrname" 
              placeholder="Digite seu sobrenome"
              value="Antunes"
            />
          </div>
        </section>       
      </form>
    </main>
  </>
)