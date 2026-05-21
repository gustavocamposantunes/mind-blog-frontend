import { ArrowRight } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Botão',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secundário',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Excluir',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Saiba mais',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continuar
        <ArrowRight />
      </>
    ),
  },
}
