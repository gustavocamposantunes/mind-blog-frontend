import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArticlesListTemplate } from '@/presentation/components/templates'
import { ArticleListCard } from '@/presentation/components/organism'
import { PublishedByInfo } from '@/presentation/components/molecules'

const meta = {
  title: 'Templates/ArticlesListTemplate',
  component: ArticlesListTemplate,
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
} satisfies Meta<typeof ArticlesListTemplate>

export default meta
type Story = StoryObj<typeof meta>

const mockArticles = Array.from({ length: 4 }).map((_, i) => (
  <ArticleListCard
    key={i}
    id={String(i + 1)}
    title={`Artigo ${i + 1}: Título Longo para Demonstração`}
    description="Este é um artigo de exemplo com conteúdo descritivo sobre tecnologia, desenvolvimento web e inovação."
    category="Desenvolvimento"
    headerImageSrc="https://via.placeholder.com/400x300"
    onClick={() => console.log(`Article ${i + 1} clicked`)}
    footer={[
      <PublishedByInfo
        key="info"
        author="João Silva"
        publishedAt={new Date(Date.now() - i * 86400000).toISOString()}
        avatar="https://github.com/gustavocamposantunes.png"
      />,
      <button key="action" className="px-4 py-2 bg-blue-500 text-white rounded">
        Ler mais
      </button>,
    ]}
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
    error: new Error('Erro ao carregar lista de artigos'),
    children: null,
  },
}
