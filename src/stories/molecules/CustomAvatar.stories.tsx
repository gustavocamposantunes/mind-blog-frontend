import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomAvatar } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/CustomAvatar',
  component: CustomAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
  },
}

export const WithoutImage: Story = {
  args: {
    src: undefined,
  },
}

export const DifferentSize: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CustomAvatar src="https://github.com/shadcn.png" />
      <CustomAvatar src="https://github.com/gustavocamposantunes.png" />
    </div>
  ),
}
