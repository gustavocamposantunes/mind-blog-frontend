import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomAvatar } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/CustomAvatar',
  component: CustomAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    src: 'https://github.com/shadcn.png',
  },
} satisfies Meta<typeof CustomAvatar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
