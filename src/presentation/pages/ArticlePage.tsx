import { Heart } from "lucide-react";
import { useParams } from "react-router-dom";

import { useGetArticleById } from "../hooks";

import type { GetArticleByIdUseCase } from "@/domain/usecases";

import { CustomSkeleton } from "@/presentation/components/atoms/CustomSkeleton";
import { FavouriteAvatarPost } from "@/presentation/components/atoms/FavouriteAvatarPost";
import { ArticleTemplate } from "@/presentation/components/templates";




type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById
}) => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetArticleById(getArticletById, String(id));

  return (
    <ArticleTemplate>
      {isLoading 
        ? 
        <span className="flex flex-col gap-4" data-testid="skeleton-group">
            <CustomSkeleton /> 
            <CustomSkeleton />
            <CustomSkeleton />
          </span>
        : error 
        ? 
          <p data-testid="error-wrapper" className="text-red-500">{error.message}</p> 
        :    
          <article>
            <div className="flex flex-col gap-4 pb-6 border-b border-[#cecece]">
              <h1 className="text-4-xl">{data?.data?.title}</h1>
              <span className="flex justify-between items-center">
                <FavouriteAvatarPost publishedAt={data?.data?.publishedAt} />
                <Heart />
              </span>
            </div>
            <img className="mt-5 w-full" src={data?.data?.image ?? "https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png"} alt={data?.data?.title} />
            <p className="p-4">
              {data?.data?.content}
            </p>
          </article>
      }
    </ArticleTemplate>
  );
}