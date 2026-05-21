import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Artigo em destaque</CardTitle>
        <CardDescription>
          Um card padrão para destacar conteúdos editoriais.
        </CardDescription>
        <CardAction>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            Novo
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          O Storybook agora mostra os estados base dos componentes de interface.
        </p>
        <p>
          Use este card como base para composições mais ricas em páginas e
          listas.
        </p>
      </CardContent>
      <CardFooter className="justify-between text-sm">
        <span>Atualizado há 5 min</span>
        <span className="font-medium text-foreground">Ler artigo</span>
      </CardFooter>
    </Card>
  ),
}
