import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card"
import { CustomAvatar } from "@/presentation/components/molecule/CustomAvatar"

export const ArticleCard = () => (
  <Card className="pt-0">
    <img src="https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png" alt="" />
    <CardHeader>
      <CardTitle>Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no...</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between">
      <CustomAvatar />
      <p>Por <b>John Doe</b> - Março 2025</p>
    </CardFooter>
  </Card>
)