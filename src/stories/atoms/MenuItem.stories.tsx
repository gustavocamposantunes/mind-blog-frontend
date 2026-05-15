import { Newspaper } from 'lucide-react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { MenuItem } from '@/presentation/components/atoms'

const meta = {
  title: 'Atoms/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    redirect: '/',
    children: 'Artigos',
    iconStart: <Newspaper />,
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
} satisfies Meta<typeof MenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
