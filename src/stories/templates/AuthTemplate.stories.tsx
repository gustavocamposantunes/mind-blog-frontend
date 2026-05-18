import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuthTemplate } from '@/presentation/components/templates'
import { AuthSection } from '@/presentation/components/molecules'
import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
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
} satisfies Meta<typeof AuthTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <AuthSection
        title="Entre em sua conta"
        description="Use seu e-mail e senha para continuar"
      >
        <form className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded px-4 py-2"
          />
          <Button className="w-full">Entrar</Button>
        </form>
      </AuthSection>
    ),
  },
}
