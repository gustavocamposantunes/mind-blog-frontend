import type { ListArticlesUseCase } from "@/domain/usecases";
import { ArticlesTemplate } from "@/presentation/components/templates";
import { ArticleCard } from "@/presentation/components/organism/ArticleCard";
import { CustomSkeleton } from "@/presentation/components/atoms/CustomSkeleton";

import { useArticlesList } from "../hooks";

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase;
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({ 
  listArticles
 }) => {
  const { data, isLoading } = useArticlesList(listArticles);

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
        {data?.data?.articles.map(({ ...props }) => <ArticleCard key={props.id} {...props} />)}
      </section>
    </ArticlesTemplate>
  )
}