import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomCard } from '@/presentation/components/organism'
import { PublishedByInfo } from '@/presentation/components/molecules'
import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'Organisms/CustomCard',
  component: CustomCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomCard>

export default meta
type Story = StoryObj<typeof meta>

const mockCardData = {
  id: '1',
  title: 'Entendendo TypeScript',
  description:
    'TypeScript adiciona tipagem estática ao JavaScript, ajudando a catch erros em tempo de desenvolvimento.',
  category: 'Desenvolvimento',
  headerImageSrc: 'https://via.placeholder.com/500x300',
  onClick: () => console.log('Card clicked'),
  footer: (
    <>
      <PublishedByInfo
        author="Maria Santos"
        publishedAt={new Date().toISOString()}
        avatar="https://github.com/gustavocamposantunes.png"
      />
      <Button>Ler mais</Button>
    </>
  ),
}

export const Default: Story = {
  args: mockCardData,
}

export const WithRanking: Story = {
  args: {
    ...mockCardData,
    ranking: '01',
  },
}

export const WithoutCategory: Story = {
  args: {
    ...mockCardData,
    category: undefined,
  },
}

export const CustomImageHeight: Story = {
  args: {
    ...mockCardData,
    imageClassName: 'h-64 object-cover',
  },
}
