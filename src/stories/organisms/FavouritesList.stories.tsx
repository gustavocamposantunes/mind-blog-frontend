import type { Meta, StoryObj } from '@storybook/react-vite'

import { FavouritesList } from '@/presentation/components/organism'
import type { ArticleModel } from '@/domain/models'

const meta = {
  title: 'Organisms/FavouritesList',
  component: FavouritesList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FavouritesList>

export default meta
type Story = StoryObj<typeof meta>

const mockArticles: ArticleModel[] = [
  {
    id: 1,
    title: 'React Hooks: Um Guia Completo',
    content:
      'Hooks foram introduzidos no React 16.8 e revolucionaram a forma como escrevemos componentes.',
    image: 'https://via.placeholder.com/400x300',
    category: 'Desenvolvimento',
    publishedAt: new Date().toISOString(),
    author: {
      id: 1,
      firstName: 'João Silva',
      avatar: 'https://github.com/gustavocamposantunes.png',
    },
  },
  {
    id: 2,
    title: 'TypeScript: Tipagem Segura',
    content:
      'TypeScript adiciona tipagem estática ao JavaScript, melhorando a segurança do código.',
    image: 'https://via.placeholder.com/400x300',
    category: 'Desenvolvimento',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: {
      id: 2,
      firstName: 'Maria Santos',
      avatar: 'https://github.com/gustavocamposantunes.png',
    },
  },
]

export const Default: Story = {
  args: {
    articles: mockArticles,
    isLoading: false,
    error: null,
  },
}

export const Loading: Story = {
  args: {
    articles: undefined,
    isLoading: true,
    error: null,
  },
}

export const WithError: Story = {
  args: {
    articles: undefined,
    isLoading: false,
    error: new Error('Erro ao carregar artigos favoritos'),
  },
}

export const Empty: Story = {
  args: {
    articles: [],
    isLoading: false,
    error: null,
  },
}
