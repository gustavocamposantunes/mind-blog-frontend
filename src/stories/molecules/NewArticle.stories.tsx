import { faker } from '@faker-js/faker'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { NewArticle } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/NewArticle',
  component: NewArticle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  },
  decorators: [
    (Story) => <section className="p-4 bg-stone-950">{Story()}</section>,
  ],
} satisfies Meta<typeof NewArticle>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
