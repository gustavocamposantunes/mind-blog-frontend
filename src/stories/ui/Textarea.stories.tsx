import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from '@/presentation/components/ui/textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Escreva sua mensagem...',
  },
}

export const WithContent: Story = {
  args: {
    defaultValue:
      'Storybook centraliza a validação visual dos componentes de formulário.',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Desabilitado',
    disabled: true,
  },
}
