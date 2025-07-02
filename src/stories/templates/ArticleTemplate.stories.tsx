import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { mockArticle } from '@/domain/test'
import { Article } from '@/presentation/components/organism'
import { ArticleTemplate } from '@/presentation/components/templates'

const meta = {
  title: 'Templates/ArticleTemplate',
  component: ArticleTemplate,
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
} satisfies Meta<typeof ArticleTemplate>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: false,
    error: null,
    children: (
      <Article
        title={mockArticle().title}
        publishedAt={mockArticle().publishedAt}
        image={mockArticle().image as string}
        content={mockArticle(true).content}
      />
    ) as ReactNode,
  },
}
