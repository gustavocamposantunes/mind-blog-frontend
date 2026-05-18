import { ThemeToggle } from '../../presentation/components/atoms/ThemeToggle'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'auth'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const AuthVariant: Story = {
  args: {
    variant: 'auth',
  },
}
