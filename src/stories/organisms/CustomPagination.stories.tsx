import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomPagination } from '@/presentation/components/organism'

const meta = {
  title: 'Organisms/CustomPagination',
  component: CustomPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    totalPages: 3,
    currentPage: 1,
    changePage: (page: number) => console.info(`Page change ${page}`),
  },
} satisfies Meta<typeof CustomPagination>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
