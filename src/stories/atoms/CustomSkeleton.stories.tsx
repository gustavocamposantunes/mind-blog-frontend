import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomSkeleton } from '@/presentation/components/atoms'

const meta = {
  title: 'Atoms/CustomSkeleton',
  component: CustomSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleSkeletons: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <CustomSkeleton />
      <CustomSkeleton />
      <CustomSkeleton />
    </div>
  ),
}

export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomSkeleton />
      <CustomSkeleton />
      <CustomSkeleton />
    </div>
  ),
}
