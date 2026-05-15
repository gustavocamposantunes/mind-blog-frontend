import { BrandLogo } from '../../presentation/components/atoms/BrandLogo'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof BrandLogo> = {
  title: 'Atoms/BrandLogo',
  component: BrandLogo,
}

export default meta
type Story = StoryObj<typeof BrandLogo>

export const Default: Story = {
  args: { tagline: 'Mind Blog', centered: false },
}

export const Centered: Story = {
  args: { tagline: 'Mind Blog', centered: true },
}
