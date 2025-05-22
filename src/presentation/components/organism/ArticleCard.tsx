import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card"
import { CustomAvatar } from "@/presentation/components/molecule/CustomAvatar"

import { useNavigate } from "react-router-dom";

interface IArticleCard {
  id: number;
  title: string;
  content: string;
}

export const ArticleCard: React.FC<IArticleCard> = ({
  id,
  title,
  content
}) => {
  const navigate = useNavigate();
  return (
    <Card className="pt-0" key={id} onClick={() => navigate(`/posts/${id}`)}>
    <img src="https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png" alt="" />
    <CardHeader>
        <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
        <CardDescription>{content}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between">
      <CustomAvatar />
      <p>Por <b>John Doe</b> - Março 2025</p>
    </CardFooter>
  </Card>
)
}