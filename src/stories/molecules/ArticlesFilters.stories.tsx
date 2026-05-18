import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArticlesFilters } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/ArticlesFilters',
  component: ArticlesFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticlesFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '',
    category: '',
    onTitleChange: (title) => console.log('Title changed:', title),
    onCategoryChange: (category) => console.log('Category changed:', category),
    onReset: () => console.log('Filters reset'),
    categories: ['Desenvolvimento', 'Design', 'Marketing', 'Negócios'],
  },
}

export const WithActiveFilters: Story = {
  args: {
    title: 'React',
    category: 'Desenvolvimento',
    onTitleChange: (title) => console.log('Title changed:', title),
    onCategoryChange: (category) => console.log('Category changed:', category),
    onReset: () => console.log('Filters reset'),
    categories: ['Desenvolvimento', 'Design', 'Marketing', 'Negócios'],
  },
}

export const NoCategoriesAvailable: Story = {
  args: {
    title: '',
    category: '',
    onTitleChange: (title) => console.log('Title changed:', title),
    onCategoryChange: (category) => console.log('Category changed:', category),
    onReset: () => console.log('Filters reset'),
    categories: [],
  },
}
