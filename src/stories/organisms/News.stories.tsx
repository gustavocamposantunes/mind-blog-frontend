import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockNews } from '@/domain/test'
import { News } from '@/presentation/components/organism'

const meta = {
  title: 'Organisms/News',
  component: News,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof News>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    news: mockNews().articles,
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    news: undefined,
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    news: [],
    isLoading: false,
  },
}
