import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card"
import { CustomAvatar } from "@/presentation/components/molecules/CustomAvatar"

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface IArticleCard {
  id: number;
  title: string;
  content: string;
  className?: string;
  redirect?: string;
  ranking?: string;
}

export const ArticleCard: React.FC<IArticleCard> = ({
  id,
  title,
  content,
  className,
  redirect,
  ranking
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className={`pt-0 cursor-pointer hover:shadow-lg transition-shadow ${className ?? ""}`}
      key={id}
      onClick={() => navigate(`/posts/${id}`)}
    >
      <div className="flex">
        <img className={`flex-1 ${ranking ? "max-w-[50%]" : ""}`} src="https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png" alt="" />
        {ranking
          ?
          <div className="flex flex-1 items-center justify-center">
            <h1 className="irish-grove-font">{ranking}</h1>
          </div>
          :
          null
        }
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{content}</CardDescription>
      </CardContent>
      <CardFooter className={`flex justify-between`}>
        {ranking
          ?
          <span className="flex gap-2">
            <Heart color="#FF3B30" fill="#FF3B30" />
            <p>16</p>
          </span>
          :
          null
        }
        <span className="flex gap-2 items-center">
          {ranking ? null : <CustomAvatar />}
          {ranking ? <p>Março 20, 2025</p> : <p>Por <b>John Doe</b> - Março 20, 2025</p>}
        </span>
        {redirect ? <Button className="orange-btn action-btn uppercase">Ler mais</Button> : null}
      </CardFooter>
    </Card>
)
}