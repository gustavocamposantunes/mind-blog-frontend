import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuthSection } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/AuthSection',
  component: AuthSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Entre em sua conta',
    description: 'Use seu e-mail e senha para acessar sua conta',
    children: (
      <div className="mt-6 space-y-4">
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
        <button className="w-full bg-blue-500 text-white rounded px-4 py-2">
          Entrar
        </button>
      </div>
    ),
  },
}

export const Register: Story = {
  args: {
    title: 'Crie sua conta',
    description: 'Preencha os dados abaixo para se registrar',
    children: (
      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full border rounded px-4 py-2"
        />
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
        <button className="w-full bg-blue-500 text-white rounded px-4 py-2">
          Registrar
        </button>
      </div>
    ),
  },
}
