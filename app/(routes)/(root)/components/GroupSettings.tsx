import type { FC } from "react"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/ui/Icons"

interface GroupSettingsProps {}

const GroupSettings: FC<GroupSettingsProps> = ({}) => {
  // todo logic
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <Icons.Settings className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => {}}>
          <Icons.Edit className="mr-2 h-4 w-4 text-success" />
          <span>Edit Group</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => {}}>
          <Icons.Delete className="mr-2 h-4 w-4 text-destructive" />
          <span>Delete Group</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { GroupSettings }
