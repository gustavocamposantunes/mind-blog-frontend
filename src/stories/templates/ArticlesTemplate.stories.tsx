import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArticlesTemplate } from '@/presentation/components/templates'
import { CustomCard } from '@/presentation/components/organism'
import { PublishedByInfo } from '@/presentation/components/molecules'

const meta = {
  title: 'Templates/ArticlesTemplate',
  component: ArticlesTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
          <Route path="/articles/:id" element={<div>Article Detail</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ArticlesTemplate>

export default meta
type Story = StoryObj<typeof meta>

const mockArticles = Array.from({ length: 6 }).map((_, i) => (
  <CustomCard
    key={i}
    id={String(i + 1)}
    title={`Artigo ${i + 1}`}
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    category="Desenvolvimento"
    headerImageSrc="https://via.placeholder.com/500x300"
    onClick={() => console.log(`Article ${i + 1} clicked`)}
    footer={
      <PublishedByInfo
        author="Autor"
        publishedAt={new Date().toISOString()}
        avatar="https://github.com/gustavocamposantunes.png"
      />
    }
  />
))

export const Default: Story = {
  args: {
    isLoading: false,
    error: null,
    children: mockArticles,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    error: null,
    children: null,
  },
}

export const WithError: Story = {
  args: {
    isLoading: false,
    error: new Error('Erro ao carregar artigos'),
    children: null,
  },
}
