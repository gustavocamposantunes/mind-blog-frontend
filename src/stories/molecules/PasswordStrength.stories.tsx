import type { Meta, StoryObj } from '@storybook/react-vite'

import { PasswordStrength } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/PasswordStrength',
  component: PasswordStrength,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordStrength>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    password: '',
  },
}

export const VeryWeak: Story = {
  args: {
    password: 'abc',
  },
}

export const Weak: Story = {
  args: {
    password: 'abcd1234',
  },
}

export const Medium: Story = {
  args: {
    password: 'Abcd1234',
  },
}

export const Strong: Story = {
  args: {
    password: 'Abcd1234!',
  },
}

export const VeryStrong: Story = {
  args: {
    password: 'Abcd1234!@#',
  },
}
