import type { Meta, StoryObj } from '@storybook/react-vite'

import { UnexpectedError } from '@/domain/errors'
import { ErrorMessage } from '@/presentation/components/atoms'

const meta = {
  title: 'Atoms/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    error: new UnexpectedError(),
  },
} satisfies Meta<typeof ErrorMessage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
