import type { Meta, StoryObj } from '@storybook/react-vite'

import { DeleteArticleModal } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/DeleteArticleModal',
  component: DeleteArticleModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeleteArticleModal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    articleTitle: 'Como começar com React',
    onCancel: () => console.log('Delete cancelled'),
    onConfirm: () => console.log('Delete confirmed'),
  },
}

export const OpenWithoutTitle: Story = {
  args: {
    isOpen: true,
    onCancel: () => console.log('Delete cancelled'),
    onConfirm: () => console.log('Delete confirmed'),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    articleTitle: 'Como começar com React',
    onCancel: () => console.log('Delete cancelled'),
    onConfirm: () => console.log('Delete confirmed'),
  },
}
