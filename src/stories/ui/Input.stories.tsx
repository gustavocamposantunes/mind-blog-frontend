import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/presentation/components/ui/input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Digite algo',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
  },
}

export const Invalid: Story = {
  args: {
    type: 'text',
    placeholder: 'Campo com erro',
    'aria-invalid': true,
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Desabilitado',
    disabled: true,
  },
}
