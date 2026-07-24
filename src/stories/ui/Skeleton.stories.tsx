import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from '@/presentation/components/ui/skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {
    className: 'h-4 w-64',
  },
}

export const AvatarWithText: Story = {
  render: () => (
    <div className="flex w-80 items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  ),
}

export const ArticleCard: Story = {
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border border-border bg-card p-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-5 w-56" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
}
