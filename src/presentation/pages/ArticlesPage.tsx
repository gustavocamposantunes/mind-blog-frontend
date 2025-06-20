import type { ListArticlesUseCase } from "@/domain/usecases";
import { ArticlesTemplate } from "@/presentation/components/templates";
import { ArticleCard } from "@/presentation/components/organism/ArticleCard";
import { CustomSkeleton } from "@/presentation/components/atoms/CustomSkeleton";

import { useArticlesList } from "../hooks";

type ArticlessPageProps = {
  loadPostsList: ListArticlesUseCase;
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({ 
  loadPostsList
 }) => {
  const { data, isLoading } = useArticlesList(loadPostsList);

  return (
    <ArticlesTemplate>
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
        {data?.data?.articles.map(({ ...props }) => <ArticleCard {...props} />)}
      </section>
    </ArticlesTemplate>
  )
}