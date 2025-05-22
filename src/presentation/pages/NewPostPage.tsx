import { Textarea } from "@/presentation/components/ui/textarea";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";

import { NewPostTemplate } from "@/presentation/components/templates"
import { useContext, useState } from "react";
import { ApiContext } from "../contexts";
import { useRegisterPost } from "../hooks/useRegisterPost";
import type { RegisterPostUseCase } from "@/domain/usecases";
import { useNavigate } from "react-router-dom";

type NewPostPageProps = {
  registerPost: RegisterPostUseCase;
}

export const NewPostPage: React.FC<NewPostPageProps> = ({
  registerPost
}) => {
  const navigate = useNavigate();

  const context = useContext(ApiContext);
  
  const [registerPostParams, setRegisterPostParams] = useState({
    title: "",
    content: ""
  });

  const { mutate } = useRegisterPost(
    registerPost,
    context.getCurrentUser?.()?.accessToken
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutate({
      ...registerPostParams,
      author_id: Number(context.getCurrentUser?.()?.user.id)
    }, {
      onSuccess: () => {
        navigate("/posts");
      }
    });
  }

  return (
    <NewPostTemplate>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <section className="flex justify-between w-full">
          <h2>Novo Artigo</h2>
          <div className="flex gap-2">
            <Button className="orange-btn action-btn" type="button" onClick={() => navigate("/posts")}>
              Cancelar
            </Button>
            <Button className="action-btn" type="submit">
              Salvar
            </Button>
          </div>
        </section>

        <section className="mt-4 flex flex-col gap-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="title">Título</Label>
            <Textarea
              placeholder="Adicione um título"
              id="title"
              value={registerPostParams.title}
              onChange={(event) =>
                setRegisterPostParams({
                  ...registerPostParams,
                  title: event.target.value,
                })
              }
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">Texto</Label>
            <Textarea
              className="min-h-[400px]"
              placeholder="Escreva seu artigo"
              id="content"
              value={registerPostParams.content}
              onChange={(event) =>
                setRegisterPostParams({
                  ...registerPostParams,
                  content: event.target.value,
                })
              }
            />
          </div>
        </section>
      </form>
    </NewPostTemplate>
  )
}