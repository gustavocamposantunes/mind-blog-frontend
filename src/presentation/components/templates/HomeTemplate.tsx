import { AuthHeader } from "@/presentation/components/molecules/AuthHeader"
import { ArticleCard } from "@/presentation/components/organism/ArticleCard";
import { News } from "../organism/News";

export const HomeTemplate = () => (
  <>
    <AuthHeader />
    <main className="px-[10%] mt-8">
      <section className="grid grid-cols-3 gap-4">
        <ArticleCard
          id={1} 
          className="col-span-2"
          title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript" 
          content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..." 
          redirect="1"
        />
        <News />
        <ArticleCard 
          id={1} 
          title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript" 
          content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..." 
          ranking="01"
        />
        <ArticleCard 
          id={1} 
          title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript" 
          content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..." 
          ranking="02"
        />
        <ArticleCard 
          id={1} 
          title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript" 
          content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..." 
          ranking="03"
        />
      </section>
    </main>
  </>
)