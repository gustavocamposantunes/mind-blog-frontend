import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { News } from '@/presentation/components/organism/News'
import { PageTemplate } from '@/presentation/components/templates'

export const HomePage = () => (
  <PageTemplate>
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
        favourite="01"
      />
      <ArticleCard
        id={1}
        title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
        content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
        favourite="02"
      />
      <ArticleCard
        id={1}
        title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
        content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
        favourite="03"
      />
    </section>
  </PageTemplate>
)
