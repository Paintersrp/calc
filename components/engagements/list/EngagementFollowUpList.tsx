"use client"

import type { FC } from "react"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { Icons } from "@/components/Icons"

import { EngagementDeleteDialog } from "../EngagementDeleteDialog"
import { EngagementListHeader } from "./EngagementListHeader"
import { EngagementListItem } from "./EngagementListItem"

const EngagementFollowUpList: FC = () => {
  const {
    followUpEngagements,
    selected,
    setSelected,
    setSelectedFromFollowUp,
    markFollowUpAsDone,
  } = useEngagements()

  const handleSelect = (id: string) => {
    if (id === selected?.id) {
      return setSelectedFromFollowUp(null)
    }

    setSelectedFromFollowUp(id)
  }

  const handleMarkAsDone = (id: string) => {
    markFollowUpAsDone(id)
    setSelected(null)

    toast({
      title: "Engagement done!",
      description: "Engagement has been marked as done.",
      variant: "success",
    })
  }

  return (
    <ul className="space-y-1.5">
      <EngagementListHeader>Follow Up Engagements</EngagementListHeader>

      <Separator className="!my-4 dark:bg-slate-700 bg-slate-300" />

      <ScrollArea className="max-h-[600px] w-full">
        <div className="space-y-1.5">
          {followUpEngagements.map((engagement) => (
            <EngagementListItem
              key={engagement.id}
              engagement={engagement}
              handleSelect={handleSelect}
            >
              <TooltipWrapper content="Mark done">
                <Button
                  size="iconSm"
                  variant="ghost"
                  className="dark:hover:!bg-slate-700 hover:!bg-slate-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMarkAsDone(engagement.id)
                  }}
                >
                  <Icons.check className="h-4 w-4 text-green-400" />
                  <span className="sr-only">Mark as done</span>
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Delete engagement">
                <EngagementDeleteDialog status={engagement.status} id={engagement.id} />
              </TooltipWrapper>
            </EngagementListItem>
          ))}
        </div>
      </ScrollArea>
    </ul>
  )
}

export { EngagementFollowUpList }
