import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockAuthenticateUserModel } from '@/domain/test'
import { getUserFromAccessToken } from '@/presentation/store'
import { UserDropdownMenu } from '@/presentation/components/organism'

const user = getUserFromAccessToken(mockAuthenticateUserModel().accessToken)

const meta = {
  title: 'Organisms/UserDropdownMenu',
  component: UserDropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    user: user ?? {
      id: 0,
      fullName: '',
      email: '',
    },
    onLogout: () => {},
    onProfileNavigate: () => {},
    onSettingsNavigate: () => {},
  },
} satisfies Meta<typeof UserDropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
