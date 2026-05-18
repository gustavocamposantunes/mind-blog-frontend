import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageTemplate } from '@/presentation/components/templates'

const meta = {
  title: 'Templates/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/profile" element={<div>Profile</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Página Padrão</h1>
        <p className="text-foreground/70">
          Este é o conteúdo da página padrão dentro do PageTemplate.
        </p>

        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold">Seção {i + 1}</h3>
              <p className="text-sm text-foreground/70 mt-1">
                Conteúdo adicional para a seção {i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
}
