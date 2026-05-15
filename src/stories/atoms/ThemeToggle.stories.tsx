import { ThemeToggle } from '../../presentation/components/atoms/ThemeToggle'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggle,
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {}
