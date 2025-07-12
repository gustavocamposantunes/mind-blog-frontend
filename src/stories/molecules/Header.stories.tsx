import { LogIn, LogOut, NotebookText, UserPen } from 'lucide-react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { MenuItem } from '@/presentation/components/atoms'
import { CustomAvatar, Header } from '@/presentation/components/molecules'
import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'

const meta = {
  title: 'Molecules/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <ul>
          <MenuItem
            iconStart={<NotebookText />}
            className="border-l-2 border-l-stone-700 pl-6"
            redirect="/article/new"
          >
            Publicar
          </MenuItem>
        </ul>
        <span className="ml-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white!">
              <CustomAvatar src="" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <UserPen />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut />
                Desconectar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </>
    ),
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
} satisfies Meta<typeof Header>
export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {}

export const LoggedOut: Story = {
  args: {
    children: (
      <>
        <ul>
          <MenuItem
            iconStart={<LogIn />}
            className="border-l-2 border-l-stone-700 pl-6"
            redirect="/login"
          >
            Entrar
          </MenuItem>
        </ul>
        <Button className="action-btn ml-6">Registrar</Button>
      </>
    ),
  },
}
