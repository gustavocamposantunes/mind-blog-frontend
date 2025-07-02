import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { mockArticle } from '@/domain/test'
import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { ArticlesTemplate } from '@/presentation/components/templates'

const meta = {
  title: 'Templates/ArticlesTemplate',
  component: ArticlesTemplate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ArticlesTemplate>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: false,
    children: (
      <>
        <ArticleCard {...mockArticle()} />
        <ArticleCard {...mockArticle()} />
        <ArticleCard {...mockArticle()} />
        <ArticleCard {...mockArticle()} />
        <ArticleCard {...mockArticle()} />
        <ArticleCard {...mockArticle()} />
      </>
    ) as ReactNode,
  },
}
