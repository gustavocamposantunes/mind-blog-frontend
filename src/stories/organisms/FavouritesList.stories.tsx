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
    resume:
      'Hooks foram introduzidos no React 16.8 e revolucionaram a forma como escrevemos componentes.',
    content:
      'Hooks foram introduzidos no React 16.8 e revolucionaram a forma como escrevemos componentes.',
    image: 'https://via.placeholder.com/400x300',
    category: 'Desenvolvimento',
    tags: ['react', 'hooks'],
    favouriteCount: 12,
    favourited: false,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: {
      id: 1,
      fullName: 'João Silva',
      image: 'https://github.com/gustavocamposantunes.png',
    },
  },
  {
    id: 2,
    title: 'TypeScript: Tipagem Segura',
    resume:
      'TypeScript adiciona tipagem estática ao JavaScript, melhorando a segurança do código.',
    content:
      'TypeScript adiciona tipagem estática ao JavaScript, melhorando a segurança do código.',
    image: 'https://via.placeholder.com/400x300',
    category: 'Desenvolvimento',
    tags: ['typescript', 'frontend'],
    favouriteCount: 8,
    favourited: true,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    author: {
      id: 2,
      fullName: 'Maria Santos',
      image: 'https://github.com/gustavocamposantunes.png',
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
