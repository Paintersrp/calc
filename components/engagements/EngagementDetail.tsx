"use client"

import type { FC } from "react"
import { format } from "date-fns"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"

import { TooltipWrapper } from "../TooltipWrapper"
import { EngagementDeleteDialog } from "./EngagementDeleteDialog"
import { EngagementDetailForm } from "./EngagementDetailForm"

const EngagementDetail: FC = () => {
  const { selected, setSelected, markAsDone, undoMarkAsDone } = useEngagements()

  if (!selected) {
    return (
      <div className="text-base">
        <h1 className="text-2xl font-medium mb-4">Engagement Details</h1>
        <p>Select an engagement to view details</p>
      </div>
    )
  }

  // Function to handle copying engagement details
  const handleCopyDetails = () => {
    const details = `Title: ${selected.title}\nDescription: ${selected.description}\nDate: ${selected.date}\nType: ${selected.type}`
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

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center items-start gap-2 justify-between">
        <div>
          <h1 className="text-2xl font-medium">Engagement Details</h1>
          <p className="dark:text-blue-400 text-blue-600 dark:font-semibold font-medium text-[0.925rem]">
            {format(selected.date, "MMMM d, yyyy hh:mm b")}
          </p>
        </div>
        <div className="flex space-x-2 justify-end items-end">
          {selected.status === "active" ? (
            <Button onClick={() => handleMarkAsDone(selected.id)} variant="destructive">
              Mark Done
            </Button>
          ) : (
            <Button onClick={() => handleUndoMarkAsDone(selected.id)} variant="destructive">
              Undo Mark Done
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
