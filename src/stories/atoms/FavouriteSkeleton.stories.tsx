import { FavouriteSkeleton } from '../../presentation/components/atoms/FavouriteSkeleton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof FavouriteSkeleton> = {
  title: 'Atoms/FavouriteSkeleton',
  component: FavouriteSkeleton,
}

export default meta
type Story = StoryObj<typeof FavouriteSkeleton>

export const Default: Story = {}
