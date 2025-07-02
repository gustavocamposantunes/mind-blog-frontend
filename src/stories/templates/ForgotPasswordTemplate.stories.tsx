import { Mail } from 'lucide-react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuthForm } from '@/presentation/components/atoms'
import { TextField } from '@/presentation/components/molecules'
import { ForgotPasswordTemplate } from '@/presentation/components/templates'
import { Button } from '@/presentation/components/ui/button'

const meta = {
  title: 'Templates/ForgotPasswordTemplate',
  component: ForgotPasswordTemplate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ForgotPasswordTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <AuthForm onSubmit={() => {}}>
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
      </AuthForm>
    ),
  },
}
