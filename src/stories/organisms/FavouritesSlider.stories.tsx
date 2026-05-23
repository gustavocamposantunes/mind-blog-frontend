import type { Meta, StoryObj } from '@storybook/react-vite'

import { FavouritesSlider } from '@/presentation/components/organism'
import type { ArticleModel } from '@/domain/models'

const meta = {
  title: 'Organisms/FavouritesSlider',
  component: FavouritesSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FavouritesSlider>

export default meta
type Story = StoryObj<typeof meta>

const mockArticles: ArticleModel[] = [
  {
    id: 1,
    title: 'React Avançado',
    resume:
      'Explore técnicas avançadas de React para criar aplicações escaláveis e performáticas.',
    content:
      'Explore técnicas avançadas de React para criar aplicações escaláveis e performáticas.',
    image: 'https://via.placeholder.com/800x400',
    category: 'Desenvolvimento',
    tags: ['react', 'advanced'],
    favouriteCount: 21,
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
    title: 'Node.js em Produção',
    resume:
      'Aprenda a deployar e manter aplicações Node.js em produção com segurança e performance.',
    content:
      'Aprenda a deployar e manter aplicações Node.js em produção com segurança e performance.',
    image: 'https://via.placeholder.com/800x400',
    category: 'Backend',
    tags: ['node', 'backend'],
    favouriteCount: 17,
    favourited: true,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    author: {
      id: 2,
      fullName: 'Maria Santos',
      image: 'https://github.com/gustavocamposantunes.png',
    },
  },
  {
    id: 3,
    title: 'CSS Grid: O Futuro do Layout',
    resume:
      'Dominie CSS Grid e crie layouts complexos e responsivos com facilidade.',
    content:
      'Dominie CSS Grid e crie layouts complexos e responsivos com facilidade.',
    image: 'https://via.placeholder.com/800x400',
    category: 'Frontend',
    tags: ['css', 'layout'],
    favouriteCount: 9,
    favourited: false,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
    author: {
      id: 3,
      fullName: 'Pedro Costa',
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
    error: new Error('Erro ao carregar slider'),
  },
}
