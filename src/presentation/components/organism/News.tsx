import { New } from '../molecules'

type INews = React.ComponentProps<'section'>
export const News: React.FC<INews> = ({ className }) => (
  <section className={`p-4 bg-stone-950 rounded-sm ${className}`}>
    <h1 className="text-white! irish-grove-font">Notícias</h1>
    <New title="..." description="..." />
  </section>
)
