import type { GetPostUseCase } from "@/domain/usecases";
import { PostTemplate } from "@/presentation/components/templates";
import { FavouriteAvatarPost } from "@/presentation/components/atoms/FavouriteAvatarPost";

import { usePostFetch } from "../hooks";

import { useParams } from "react-router-dom";

import { Heart } from "lucide-react";
import { CustomSkeleton } from "@/presentation/components/atoms/CustomSkeleton";

type PostPageProps = {
  fetchPost: GetPostUseCase
}

export const PostPage: React.FC<PostPageProps> = ({
  fetchPost
}) => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = usePostFetch(fetchPost, String(id));

  return (
    <PostTemplate>
      {isLoading 
        ? 
          <span className="flex flex-col gap-4">
            <CustomSkeleton /> 
            <CustomSkeleton />
            <CustomSkeleton />
          </span>
        : error 
        ? 
          <p className="text-red-500">{error.name}</p> 
        :    
          <article>
            <div className="flex flex-col gap-4 pb-6 border-b border-[#cecece]">
              <h1 className="text-4-xl">{data?.title}</h1>
              <span className="flex justify-between items-center">
                <FavouriteAvatarPost />
                <Heart />
              </span>
            </div>
            <img className="mt-5 w-full" src="https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png" alt="imagem do post" />
            <p className="p-4">
              {data?.content}
            </p>
          </article>
      }
    </PostTemplate>
  );
}