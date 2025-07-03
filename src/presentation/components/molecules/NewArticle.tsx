type INewArticle = {
  title: string
  description: string
} & React.ComponentProps<'article'>

export const NewArticle: React.FC<INewArticle> = ({
  title,
  description,
  ...props
}) => (
  <article {...props} data-testid="new-article">
    <h2 className="text-white! font-bold hover:underline">{title}</h2>
    <p className="text-white! mt-2">{description}</p>
  </article>
)
