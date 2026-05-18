import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArticleListCard } from '@/presentation/components/organism'
import { PublishedByInfo } from '@/presentation/components/molecules'

const meta = {
  title: 'Organisms/ArticleListCard',
  component: ArticleListCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleListCard>

export default meta
type Story = StoryObj<typeof meta>

const mockArticleData = {
  id: '1',
  title: 'Como começar com React',
  description: 'Um guia completo para iniciantes em React, cobrindo componentes, hooks e muito mais.',
  category: 'Desenvolvimento',
  headerImageSrc: 'https://via.placeholder.com/400x300',
  onClick: () => console.log('Article clicked'),
  footer: [
    <PublishedByInfo
      key="info"
      author="João Silva"
      publishedAt={new Date().toISOString()}
      avatar="https://github.com/gustavocamposantunes.png"
    />,
    <button
      key="action"
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Ler mais
    </button>,
  ],
}

export const Default: Story = {
  args: mockArticleData,
}

export const WithoutImage: Story = {
  args: {
    ...mockArticleData,
    headerImageSrc: undefined,
  },
}

export const WithoutCategory: Story = {
  args: {
    ...mockArticleData,
    category: undefined,
  },
}

export const LongTitle: Story = {
  args: {
    ...mockArticleData,
    title: 'Como começar com React: Um guia completo para iniciantes que desejam aprender a framework mais popular do momento',
  },
}
