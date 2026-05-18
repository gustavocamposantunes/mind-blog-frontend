import { FavoriteButton } from '../../presentation/components/atoms/FavoriteButton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof FavoriteButton> = {
  title: 'Atoms/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FavoriteButton>

export const NotFavorited: Story = {
  args: {
    isFavorited: false,
    isCurrentUserAndLoggedIn: true,
    favoriteById: (id: number, favourite: () => boolean) => {
      console.log('Added to favorites:', id)
      void favourite()
    },
  },
}

export const Favorited: Story = {
  args: {
    isFavorited: true,
    isCurrentUserAndLoggedIn: true,
    favoriteById: (id: number, favourite: () => boolean) => {
      console.log('Removed from favorites:', id)
      void favourite()
    },
  },
}

export const NotLoggedIn: Story = {
  args: {
    isFavorited: false,
    isCurrentUserAndLoggedIn: false,
    favoriteById: (id: number, favourite: () => boolean) => {
      void id
      void favourite()
    },
  },
}
