import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockNews } from '@/domain/test'
import { News } from '@/presentation/components/organism'

const meta = {
  title: 'Organisms/News',
  component: News,
  parameters: {
    layout: 'centered',
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
