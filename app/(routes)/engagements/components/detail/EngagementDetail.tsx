"use client"

import type { FC } from "react"
import { format } from "date-fns"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"
import { Text } from "@/components/ui/Text"
import { TooltipWrapper } from "@/components/ui/Tooltip"

import { EngagementDeleteDialog } from "../EngagementDeleteDialog"
import { EngagementDetailForm } from "./EngagementDetailForm"
import { EngagementDetailSkeleton } from "./EngagementDetailSkeleton"

const EngagementDetail: FC = () => {
  const { selected, setSelected, markAsDone, undoMarkAsDone, undoMarkAsFollowUp } = useEngagements()

  if (!selected) {
    return <EngagementDetailSkeleton />
  }

  // Function to handle copying engagement details
  const handleCopyDetails = () => {
    const details = `\nDate: ${selected.date}Associate: ${selected.associate}\nType: ${selected.type}\nNotes: ${selected.notes}`
    navigator.clipboard.writeText(details)

    toast({
      title: "Content copied!",
      description: "Engagement successfully copied to clipboard.",
      variant: "info",
    })
  }

  const handleMarkAsDone = (id: string) => {
    markAsDone(id)
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
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center items-start gap-2 justify-between">
        <div>
          <Text type="h3">Engagement Details</Text>
          <Text size="xs" variant="blue" className="dark:font-semibold font-medium">
            {format(selected.date, "MMMM d, yyyy hh:mm b")}
          </Text>
        </div>
        <div className="flex space-x-2 justify-end items-end">
          {selected.status === "active" ? (
            <Button onClick={() => handleMarkAsDone(selected.id)} variant="destructive">
              Mark Done
            </Button>
          ) : selected.status === "done" ? (
            <Button onClick={() => handleUndoMarkAsDone(selected.id)} variant="destructive">
              Undo Mark Done
            </Button>
          ) : (
            <Button onClick={() => handleUndoMarkAsFollowUp(selected.id)} variant="destructive">
              Undo Follow Up
            </Button>
          )}
          <Button onClick={handleCopyDetails} variant="accent">
            Copy Details
          </Button>
          <Button type="submit" variant="success" form="update-form">
            Save Changes
          </Button>
        </div>
      </div>
      <Separator className="!my-4 dark:bg-slate-700 bg-slate-300" />
      <EngagementDetailForm selected={selected} />
      <div className="flex w-full justify-end mt-4">
        <TooltipWrapper content="Delete engagement">
          <EngagementDeleteDialog status={selected.status} id={selected.id} />
        </TooltipWrapper>
      </div>
    </div>
  )
}

export { EngagementDetail }
