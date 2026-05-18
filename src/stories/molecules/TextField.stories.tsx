import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextField } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite aqui seu nome',
    type: 'text',
    id: 'name',
  },
}

export const Email: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'seu@email.com',
    type: 'email',
    id: 'email',
  },
}

export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
    id: 'password',
  },
}

export const WithError: Story = {
  args: {
    label: 'Campo com erro',
    placeholder: 'Digite aqui',
    type: 'text',
    id: 'field',
    error: <span className="text-red-500 text-sm">Este campo é obrigatório</span>,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Desabilitado',
    type: 'text',
    id: 'disabled',
    disabled: true,
  },
}
