import { FavoriteButton } from '../../presentation/components/atoms/FavoriteButton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof FavoriteButton> = {
  title: 'Atoms/FavoriteButton',
  component: FavoriteButton,
}

export default meta
type Story = StoryObj<typeof FavoriteButton>

export const Default: Story = {
  args: {
    isFavorited: false,
    isCurrentUserAndLoggedIn: true,
    favoriteById: (id: number, favourite: () => boolean) => {
      // use args to avoid unused variable lint
      void id
      void favourite()
    },
  },
}
