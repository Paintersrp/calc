"use client"

import type { FC } from "react"
import { format } from "date-fns"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"

import { Icons } from "../Icons"

const EngagementDetail: FC = () => {
  const { selected, setSelected, markAsDone, undoMarkAsDone, deleteEngagement, deleteFromHistory } =
    useEngagements()

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

  const handleDelete = (id: string) => {
    if (selected.status === "active") {
      deleteEngagement(id)
    } else {
      deleteFromHistory(id)
    }

    setSelected(null)

    toast({
      title: "Engagement successfully deleted!",
      description: "Engagement has been deleted and removed from history.",
      variant: "destructive",
    })
  }

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center items-start gap-2 justify-between">
        <h1 className="text-2xl font-medium">Engagement Details</h1>
        <div className="flex space-x-2 justify-end items-end">
          <Button onClick={handleCopyDetails} variant="accent">
            Copy Details
          </Button>
          {selected.status === "active" ? (
            <Button onClick={() => handleMarkAsDone(selected.id)} variant="destructive">
              Mark Done
            </Button>
          ) : (
            <Button onClick={() => handleUndoMarkAsDone(selected.id)} variant="destructive">
              Undo Mark Done
            </Button>
          )}
        </div>
      </div>
      <Separator className="!my-4 dark:bg-slate-700 bg-slate-300" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
            Title
          </h2>
          <p className="mb-3">{selected.title}</p>
        </div>
        <div>
          <h2 className="text-xl dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
            Associate Login
          </h2>
          <p className="mb-3">{selected.login}</p>
        </div>
        <div>
          <h2 className="text-xl dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
            Date
          </h2>

          <p className="mb-3">{format(selected.date, "MMMM d, yyyy hh:mm b")}</p>
        </div>
        <div>
          <h2 className="text-xl dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
            Type
          </h2>
          <p className="mb-3">{selected.type}</p>
        </div>
        <div className="col-span-2">
          <h2 className="text-xl dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
            Description
          </h2>
          <p className="mb-3">{selected.description}</p>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            handleDelete(selected.id)
          }}
        >
          <Icons.delete className="h-5 w-5 text-red-500" />
        </Button>
      </div>
    </div>
  )
}

export { EngagementDetail }
