import { UserPlus } from 'lucide-react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuthForm } from '@/presentation/components/atoms'
import { TextField } from '@/presentation/components/molecules'
import { RegisterUserTemplate } from '@/presentation/components/templates'
import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'Templates/RegisterUserTemplate',
  component: RegisterUserTemplate,
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
} satisfies Meta<typeof RegisterUserTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <AuthForm onSubmit={() => {}}>
        <TextField
          className="mt-8"
          label="Nome"
          type="name"
          id="name"
          placeholder="Digite seu nome"
        />
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
        <TextField
          className="mt-8"
          label="Confirmar Senha"
          type="password"
          id="password-confirmation"
          placeholder="Confirme sua senha"
        />

        <Button className="mt-4 w-full py-6" type="submit">
          Criar Conta
          <UserPlus />
        </Button>
      </AuthForm>
    ),
  },
}
