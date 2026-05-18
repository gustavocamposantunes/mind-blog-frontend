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

export const FirstPage: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    changePage: (page: number) => console.info(`Changed to page ${page}`),
  },
}

export const MiddlePage: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    changePage: (page: number) => console.info(`Changed to page ${page}`),
  },
}

export const LastPage: Story = {
  args: {
    totalPages: 10,
    currentPage: 10,
    changePage: (page: number) => console.info(`Changed to page ${page}`),
  },
}

export const FewPages: Story = {
  args: {
    totalPages: 3,
    currentPage: 1,
    changePage: (page: number) => console.info(`Changed to page ${page}`),
  },
}

export const SinglePage: Story = {
  args: {
    totalPages: 1,
    currentPage: 1,
    changePage: (page: number) => console.info(`Changed to page ${page}`),
  },
}
