import type { Meta, StoryObj } from '@storybook/react-vite'

import { Footer } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/Footer',
  component: Footer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
