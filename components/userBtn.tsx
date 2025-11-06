import { Button } from "@/components/ui/button"
import { getCurrentUser } from '@/lib/current-user'
import { logoutAction } from "@/lib/logout-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BoltIcon,
  ChevronDownIcon,
  CopyPlusIcon,
  LogOut,
} from "lucide-react"


export default async function UserButton() {
  const user = await getCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user?.username}
          <ChevronDownIcon
            className="-me-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CopyPlusIcon size={16} className="opacity-60" aria-hidden="true" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={logoutAction}>
          <button className="w-full">
            <DropdownMenuItem variant="destructive">
              <LogOut size={16} className="opacity-60" aria-hidden="true" />
              Logout
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
