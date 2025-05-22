import logoDark from "../assets/logo-dark.svg";
import { Button } from "@/presentation/components/ui/button";
import { ArticleCard } from "@/presentation/components/organism/ArticleCard";

import { useNavigate } from "react-router-dom";

export const PostsTemplate = () => {
  const navigate = useNavigate()
  return (
  <>
    <header className="w-full flex justify-between px-[10%] pt-4">
      <img src={logoDark} alt="" />
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li><a href="">Home</a></li>
          <li className="pr-4"><a href="" className="font-black">Artigos</a></li>
          <li className="border-l-2 border-l-stone-700 pl-6"><a href="">Entrar</a></li>
        </ul>
        <Button onClick={() => navigate("register")} className="action-btn ml-6">Registrar</Button>
      </nav>
    </header>
    <main className="px-[10%] mt-8">
      <section className="grid grid-cols-3 gap-4">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </section>
    </main>
  </>
)
}