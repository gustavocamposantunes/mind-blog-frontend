import { LogIn } from 'lucide-react'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuthForm } from '@/presentation/components/atoms'
import { TextField } from '@/presentation/components/molecules'
import { LoginTemplate } from '@/presentation/components/templates'
import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
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
} satisfies Meta<typeof LoginTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <AuthForm onSubmit={() => {}}>
        <TextField
          className="mt-8"
          label="Email"
          type="email"
          id="email"
          placeholder="Digite seu email"
        />
        <TextField
          className="mt-8"
          label="Senha"
          type="password"
          id="password"
          placeholder="Digite sua senha"
        />

        <Link to="/forgot-password" className="text-end mt-4">
          Esqueceu a senha?
        </Link>

        <Button className="mt-4 w-full py-6" type="submit">
          Entrar
          <LogIn />
        </Button>
      </AuthForm>
    ),
  },
}
