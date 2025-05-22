import { Textarea } from "@/presentation/components/ui/textarea";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";

import { AuthHeader } from "@/presentation/components/molecules/AuthHeader";

export const NewPostTemplate = () => (
  <>
    <AuthHeader />
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