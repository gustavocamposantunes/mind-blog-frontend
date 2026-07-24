import type { Meta, StoryObj } from '@storybook/react-vite'

import { AccessibilityToolbar } from '@/presentation/components/atoms/AccessibilityToolbar'

const meta = {
  title: 'Atoms/AccessibilityToolbar',
  component: AccessibilityToolbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative min-h-96 bg-background p-8 text-foreground">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Conteudo de referencia
          </p>
          <h1 className="text-3xl font-semibold">
            Barra lateral de acessibilidade
          </h1>
          <p className="text-sm leading-6 text-foreground/70">
            Use esta tela para validar o seletor de modo de visualizacao e o
            acionador do VLibras em uma pagina com conteudo.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccessibilityToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
