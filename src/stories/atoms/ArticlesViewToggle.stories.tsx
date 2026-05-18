import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArticlesViewToggle } from '@/presentation/components/atoms'

const meta = {
  title: 'Atoms/ArticlesViewToggle',
  component: ArticlesViewToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentView: {
      control: { type: 'radio' },
      options: ['grid', 'list'],
    },
  },
} satisfies Meta<typeof ArticlesViewToggle>

export default meta
type Story = StoryObj<typeof meta>

export const GridView: Story = {
  args: {
    currentView: 'grid',
    onViewChange: (view) => console.log('View changed to:', view),
  },
}

export const ListView: Story = {
  args: {
    currentView: 'list',
    onViewChange: (view) => console.log('View changed to:', view),
  },
}
