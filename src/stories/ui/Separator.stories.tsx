import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '@/presentation/components/ui/separator'

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-80 space-y-4 text-sm text-foreground">
      <p>Detalhes do artigo</p>
      <Separator {...args} />
      <p className="text-foreground/70">Comentarios, curtidas e tags.</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-16 items-center gap-4 text-sm text-foreground">
      <span>Artigos</span>
      <Separator {...args} />
      <span>Noticias</span>
      <Separator {...args} />
      <span>Perfil</span>
    </div>
  ),
}
