import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} htmlFor="story-label-name">
        Nome
      </Label>
      <Input id="story-label-name" placeholder="Digite seu nome" />
    </div>
  ),
}

export const Required: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} htmlFor="story-label-email">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="story-label-email" type="email" placeholder="seu@email.com" />
    </div>
  ),
}

export const DisabledGroup: Story = {
  render: (args) => (
    <div className="group grid w-72 gap-2" data-disabled="true">
      <Label {...args} htmlFor="story-label-disabled">
        Campo desabilitado
      </Label>
      <Input id="story-label-disabled" placeholder="Indisponivel" disabled />
    </div>
  ),
}
