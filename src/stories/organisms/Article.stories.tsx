import type { Meta, StoryObj } from '@storybook/react-vite'

import { Article } from '@/presentation/components/organism'
import { FavoriteButton } from '@/presentation/components/atoms'

const meta = {
  title: 'Organisms/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Article>

export default meta
type Story = StoryObj<typeof meta>

const mockArticleData = {
  title: 'Como começar com React',
  publishedAt: new Date().toISOString(),
  image: 'https://via.placeholder.com/800x400',
  content: `## Introdução

React é uma biblioteca JavaScript para construir interfaces de usuário. Neste artigo, vamos explorar os conceitos básicos.

### Componentes

Componentes são blocos de construção do React. Eles encapsulam elementos da UI e sua lógica.

\`\`\`javascript
function App() {
  return <h1>Olá, React!</h1>
}
\`\`\`

### Props

Props são argumentos passados para componentes React, similarmente a parâmetros de funções.`,
  author: {
    id: 1,
    firstName: 'João Silva',
    avatar: 'https://github.com/gustavocamposantunes.png',
  },
}

export const Default: Story = {
  args: mockArticleData,
}

export const WithFavoriteButton: Story = {
  args: {
    ...mockArticleData,
    toogleFavouriteSlot: (
      <FavoriteButton
        articleId={1}
        isFavorited={false}
        isCurrentUserAndLoggedIn={true}
        favoriteById={() => {}}
      />
    ),
  },
}

export const WithoutAuthor: Story = {
  args: {
    ...mockArticleData,
    author: undefined,
  },
}
