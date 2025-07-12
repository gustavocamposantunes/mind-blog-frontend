import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { FormHeader } from '@/presentation/components/molecules'

const meta = {
  title: 'Molecules/FormHeader',
  component: FormHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Editar perfil',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof FormHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
