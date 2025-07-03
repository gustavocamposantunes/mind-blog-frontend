type INew = {
  title: string
  description: string
} & React.ComponentProps<'article'>

export const New: React.FC<INew> = ({ title, description, ...props }) => (
  <article {...props}>
    <h2 className="text-white! font-bold">{title}</h2>
    <p className="text-white! mt-2">{description}</p>
  </article>
)
