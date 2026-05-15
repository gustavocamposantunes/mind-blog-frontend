import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomSkeleton } from '@/presentation/components/atoms'

const meta = {
  title: 'Atoms/CustomSkeleton',
  component: CustomSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <section className="w-4xl">{Story()}</section>],
} satisfies Meta<typeof CustomSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
