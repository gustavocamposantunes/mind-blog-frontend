import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeTemplate } from '@/presentation/components/templates'

const meta = {
  title: 'Templates/HomeTemplate',
  component: HomeTemplate,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof HomeTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-8">
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Bem-vindo</h2>
          <p className="text-foreground/70">
            Este é o conteúdo da página inicial do Mind Blog.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-6">
              <h3 className="font-semibold mb-2">Seção {i + 1}</h3>
              <p className="text-sm text-foreground/70">
                Conteúdo de exemplo para a seção {i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
}
