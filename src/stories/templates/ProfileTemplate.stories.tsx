import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProfileTemplate } from '@/presentation/components/templates'

const meta = {
  title: 'Templates/ProfileTemplate',
  component: ProfileTemplate,
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
} satisfies Meta<typeof ProfileTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    error: null,
    children: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Meu Perfil</h1>

        <div className="bg-muted rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>
            <input
              type="text"
              defaultValue="João Silva"
              className="w-full border rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">E-mail</label>
            <input
              type="email"
              defaultValue="joao@example.com"
              className="w-full border rounded px-4 py-2 mt-1"
            />
          </div>

          <button className="bg-blue-500 text-white rounded px-6 py-2">
            Salvar Alterações
          </button>
        </div>
      </div>
    ),
  },
}

export const WithError: Story = {
  args: {
    error: new Error('Falha ao carregar perfil'),
    children: null,
  },
}
