import type { Meta, StoryObj } from '@storybook/react-vite'

import { MarkdownRenderer } from '@/presentation/components/organism'

const meta = {
  title: 'Organisms/MarkdownRenderer',
  component: MarkdownRenderer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MarkdownRenderer>

export default meta
type Story = StoryObj<typeof meta>

const markdownContent = `# Título Principal

Este é um parágrafo de exemplo com **texto em negrito** e *texto em itálico*.

## Subtítulo

### Sub-subtítulo

Aqui temos uma lista:

- Item 1
- Item 2
- Item 3

E uma lista numerada:

1. Primeiro item
2. Segundo item
3. Terceiro item

Um bloco de código:

\`\`\`javascript
function hello() {
  console.log('Olá, Markdown!');
}
\`\`\`

Uma citação:

> "A programação é a arte de contar ao computador exatamente o que você quer que ele faça."

E um [link de exemplo](https://example.com).
`

export const Default: Story = {
  args: {
    content: markdownContent,
  },
}

export const Empty: Story = {
  args: {
    content: '',
    emptyMessage: 'Nenhum conteúdo para exibir',
  },
}

export const SimpleContent: Story = {
  args: {
    content: '# Título\n\nEste é um parágrafo simples.',
  },
}

export const WithCustomEmptyMessage: Story = {
  args: {
    content: '',
    emptyMessage: 'Desculpe, o conteúdo não está disponível.',
  },
}
