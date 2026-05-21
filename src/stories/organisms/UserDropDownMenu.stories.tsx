import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockAuthenticateUserModel } from '@/domain/test'
import { UserDropdownMenu } from '@/presentation/components/organism'

const meta = {
  title: 'Organisms/UserDropdownMenu',
  component: UserDropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    user: mockAuthenticateUserModel().user,
    onLogout: () => {},
    onProfileNavigate: () => {},
    onSettingsNavigate: () => {},
  },
} satisfies Meta<typeof UserDropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
