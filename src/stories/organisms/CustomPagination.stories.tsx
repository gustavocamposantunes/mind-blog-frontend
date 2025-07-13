import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomPagination } from '@/presentation/components/organism'

const meta = {
  title: 'Organisms/CustomPagination',
  component: CustomPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomPagination>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
