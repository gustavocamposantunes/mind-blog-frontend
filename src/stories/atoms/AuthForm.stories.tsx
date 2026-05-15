import { Mail } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuthForm } from '@/presentation/components/atoms'
import { TextField } from '@/presentation/components/molecules'
import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'Atoms/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <TextField
          className="mt-8"
          label="Email"
          type="email"
          id="email"
          placeholder="Digite seu email"
        />

        <Button className="mt-4 w-full py-6" type="submit">
          Enviar email de recuperação
          <Mail />
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof AuthForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
