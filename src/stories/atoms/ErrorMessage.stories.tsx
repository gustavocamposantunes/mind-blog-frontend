import type { Meta, StoryObj } from '@storybook/react-vite'

import { UnexpectedError, NotFoundError } from '@/domain/errors'
import { ErrorMessage } from '@/presentation/components/atoms'

const meta = {
  title: 'Atoms/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const UnexpectedErrorExample: Story = {
  args: {
    error: new UnexpectedError(),
  },
}

export const NotFoundErrorExample: Story = {
  args: {
    error: new NotFoundError('Artigo não encontrado'),
  },
}

export const CustomError: Story = {
  args: {
    error: new Error('Erro ao conectar com o servidor'),
  },
}

export const Default: Story = {
  args: {
    error: new UnexpectedError(),
  },
}
