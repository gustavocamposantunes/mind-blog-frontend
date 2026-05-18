import type { Meta, StoryObj } from '@storybook/react-vite'

import { PublishedByInfo } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/PublishedByInfo',
  component: PublishedByInfo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PublishedByInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    author: 'João Silva',
    publishedAt: new Date().toISOString(),
    avatar: 'https://github.com/gustavocamposantunes.png',
  },
}

export const WithoutAvatar: Story = {
  args: {
    author: 'Maria Santos',
    publishedAt: new Date().toISOString(),
  },
}

export const DifferentDate: Story = {
  args: {
    author: 'Pedro Costa',
    publishedAt: new Date('2025-01-15').toISOString(),
    avatar: 'https://github.com/gustavocamposantunes.png',
  },
}
