import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card"
import { FavouriteAvatarPost } from "@/presentation/components/atoms/FavouriteAvatarPost";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FavouriteHeartCount } from "../atoms/FavouriteHeartCount";

interface IArticleCard {
  id: number;
  title: string;
  content: string;
  className?: string;
  redirect?: string;
  favourite?: string;
}

export const ArticleCard: React.FC<IArticleCard> = ({
  id,
  title,
  content,
  className,
  redirect,
  favourite
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className={`pt-0 cursor-pointer hover:shadow-lg transition-shadow ${className ?? ""}`}
      key={id}
      onClick={() => navigate(`/posts/${id}`)}
    >
      <div className="flex">
        <img className={`flex-1 ${favourite ? "max-w-[50%]" : ""}`} src="https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png" alt="" />
        {favourite
          ?
          <div className="flex flex-1 items-center justify-center">
            <h1 className="irish-grove-font">{favourite}</h1>
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
        <FavouriteHeartCount favourite={favourite} />
        <FavouriteAvatarPost favourite={favourite} />
        {redirect ? <Button className="orange-btn action-btn uppercase">Ler mais</Button> : null}
      </CardFooter>
    </Card>
)
}