import type { FC } from "react"
import { MoreVertical } from "lucide-react"

import { Engagement, useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/ui/Icons"
import { Text } from "@/components/ui/Text"

import { EngagementDeleteDialog } from "../../EngagementDeleteDialog"

interface ListMenuMenuProps {
  engagement: Engagement
}

const ListMenu: FC<ListMenuMenuProps> = ({ engagement }) => {
  const {
    setSelected,
    markAsDone,
    markFollowUpAsDone,
    undoMarkAsDone,
    markAsFollowUp,
    markAsFollowUpFromHistory,
    undoMarkAsFollowUp,
  } = useEngagements()

  const handleMarkAsDone = (id: string) => {
    if (engagement.status === "active") {
      markAsDone(id)
    } else if (engagement.status === "followUp") {
      markFollowUpAsDone(id)
    }

    setSelected(null)

    toast({
      title: "Engagement done!",
      description: "Engagement has been marked as done.",
      variant: "success",
    })
  }

  const handleUndoMarkAsDone = (id: string) => {
    undoMarkAsDone(id)
    setSelected(id)

    toast({
      title: "Engagement successfully restored!",
      description: "Engagement status has been adjusted from done to active.",
      variant: "success",
    })
  }

  const handleMarkAsFollowUp = (id: string) => {
    if (engagement.status === "active") {
      markAsFollowUp(id)
    } else if (engagement.status === "done") {
      markAsFollowUpFromHistory(id)
    }

    setSelected(null)

    toast({
      title: "Moved to follow ups!",
      description: "Engagement has been moved to the follow up list.",
      variant: "success",
    })
  }

  const handleUndoMarkAsFollowUp = (id: string) => {
    undoMarkAsFollowUp(id)
    setSelected(id)

    toast({
      title: "Engagement no longer requires follow up!",
      description: "Engagement status has been adjusted from follow up to active.",
      variant: "success",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="iconSm"
          variant="ghost"
          className="dark:hover:!bg-slate-700 hover:!bg-slate-300"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:text-white ">
        {/* Move to follow up option only available in "active" list */}
        {engagement.status !== "followUp" && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              handleMarkAsFollowUp(engagement.id)
            }}
          >
            <Icons.follow className="mr-2 h-4 w-4 text-warning font-bold" />
            <Text className="font-medium">Move to follow ups</Text>
          </DropdownMenuItem>
        )}

        {/* Undo move to follow up option only available in "follow up" list */}
        {engagement.status === "followUp" && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              handleUndoMarkAsFollowUp(engagement.id)
            }}
          >
            <Icons.undo className="mr-2 h-4 w-4 text-warning" />
            <Text className="font-medium">Undo as follow up</Text>
          </DropdownMenuItem>
        )}

        {/* Mark as done option only available in "active" and "followUp" lists. If status is "done", show an undo mark as done option */}
        {engagement.status === "active" || engagement.status === "followUp" ? (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              handleMarkAsDone(engagement.id)
            }}
          >
            <Icons.check className="mr-2 h-4 w-4 text-green-400" />
            <Text className="font-medium">Mark as done</Text>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              handleUndoMarkAsDone(engagement.id)
            }}
          >
            <Icons.undo className="mr-2 h-4 w-4 text-green-400" />
            <Text className="font-medium">Undo mark as done</Text>
          </DropdownMenuItem>
        )}

        {/* Delete engagement option available on all lists. Opens confirmation dialog. */}
        <EngagementDeleteDialog status={engagement.status} id={engagement.id}>
          <Button
            variant="ghost"
            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 h-8 font-normal"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Icons.delete className="mr-2 h-4 w-4 text-red-500" />
            <Text className="font-medium">Delete engagement</Text>
          </Button>
        </EngagementDeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ListMenu }
