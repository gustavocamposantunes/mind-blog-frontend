import type { ListPostsUseCase } from "@/domain/usecases";
import { PostsTemplate } from "@/presentation/components/templates";
import { ArticleCard } from "@/presentation/components/organism/ArticleCard";
import { CustomSkeleton } from "@/presentation/components/atoms/CustomSkeleton";

import { usePostsList } from "../hooks";

type PostsPageProps = {
  loadPostsList: ListPostsUseCase;
}

export const PostsPage: React.FC<PostsPageProps> = ({ 
  loadPostsList
 }) => {
  const { data, isLoading } = usePostsList(loadPostsList);

  return (
    <PostsTemplate>
      <section className="grid grid-cols-3 gap-4">
        {isLoading ?
          <>
            <CustomSkeleton />
            <CustomSkeleton />
            <CustomSkeleton />
            <CustomSkeleton />
            <CustomSkeleton />
            <CustomSkeleton />
          </>
          :
          null
        }
        {data?.map(({ ...props }) => <ArticleCard {...props} />)}
      </section>
    </PostsTemplate>
  )
}