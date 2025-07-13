import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextField } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Nome',
    placeholder: 'Digite aqui seu nome',
  },
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    value: 'xpto&&Ab',
  },
}
