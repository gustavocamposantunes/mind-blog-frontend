import { ChevronDown, LogOut, UserPen } from 'lucide-react'

import { CustomAvatar } from '../molecules'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface IUserDropDownMenu {
  user: {
    firstName: string
    lastName: string
    image?: string
  }
  onProfileNavigate(): void
  onLogout(): void
}

export const UserDropdownMenu: React.FC<IUserDropDownMenu> = ({
  user,
  onProfileNavigate,
  onLogout,
}) => {
  const fallback = `${user.firstName[0]}${user.lastName[0]}`
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-testid="dropdown-trigger"
        className="bg-white! flex items-center justify-center rounded-full p-1 text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
      >
        <h2 className="">{user.firstName + ' ' + user.lastName}</h2>
        <ChevronDown className="ml-2 h-4 w-4" />
        <CustomAvatar src={user.image} fallbackText={fallback} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={onProfileNavigate}>
          <UserPen />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOut />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
