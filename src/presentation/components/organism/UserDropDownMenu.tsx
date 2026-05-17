import { ChevronDown, LogOut, LayoutDashboard, Settings } from 'lucide-react'

import { CustomAvatar } from '../molecules'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'

interface IUserDropDownMenu {
  user: {
    fullName: string
    email?: string
    image?: string
  }
  onProfileNavigate(): void
  onSettingsNavigate(): void
  onLogout(): void
}

export const UserDropdownMenu: React.FC<IUserDropDownMenu> = ({
  user,
  onProfileNavigate,
  onSettingsNavigate,
  onLogout,
}) => {
  const fullName = user.fullName ?? ''
  const displayName = fullName || user.email || 'Usuário'
  const fallback = (fullName || user.email || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-testid="dropdown-trigger"
        className="!bg-background flex items-center gap-2 rounded-md p-1 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-500"
      >
        <CustomAvatar src={user.image} fallbackText={fallback} />
        <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <div className="px-3 py-3 flex items-center gap-3">
          <div className="flex-shrink-0">
            <CustomAvatar src={user.image} fallbackText={fallback} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{displayName}</span>
            {user.email && (
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onProfileNavigate}>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onSettingsNavigate}>
          <Settings />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onLogout} data-variant="destructive">
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
