"use client"

import type { FC } from "react"
import { format } from "date-fns"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"

import { Icons } from "../Icons"
import EngagementAddDialog from "./EngagementAddDialog"

const EngagementHistoryList: FC = () => {
  const {
    engagementHistory,
    selected,
    setSelected,
    setSelectedFromHistory,
    undoMarkAsDone,
    deleteFromHistory,
  } = useEngagements()

  const handleSelect = (id: string) => {
    if (id === selected?.id) {
      return setSelectedFromHistory(null)
    }

    setSelectedFromHistory(id)
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
    deleteFromHistory(id)
    setSelected(null)

    toast({
      title: "Engagement successfully deleted!",
      description: "Engagement has been deleted and removed from history.",
      variant: "destructive",
    })
  }

  return (
    <ul className="space-y-1.5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Engagement History</h1>
        <EngagementAddDialog />
      </div>

      <Separator className="!my-4 dark:bg-slate-700 bg-slate-300" />

      {engagementHistory.map((engagement) => (
        <div key={engagement.id}>
          <li
            className={buttonVariants({
              variant: selected?.id === engagement.id ? "accent" : "ghost",
              className: "flex flex-col w-full !py-10 justify-center items-start",
            })}
            onClick={() => handleSelect(engagement.id)}
          >
            <div className="flex w-full">
              <div className="flex flex-col items-start w-full">
                <h3 className="text-lg dark:font-semibold">{engagement.title}</h3>
                <p className="dark:text-blue-400 text-blue-600">
                  {format(engagement.date, "MMMM d, hh:mm b")}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="iconSm"
                  variant="ghost"
                  className="dark:hover:!bg-slate-700 hover:!bg-slate-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUndoMarkAsDone(engagement.id)
                  }}
                >
                  <Icons.undo className="h-4 w-4 text-green-400" />
                  <span className="sr-only">Undo mark as done</span>
                </Button>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="dark:hover:!bg-slate-700 hover:!bg-slate-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(engagement.id)
                  }}
                >
                  <Icons.delete className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Delete engagement</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="dark:text-slate-300 text-slate-600">Login: {engagement.login}</p>
              <p className="dark:text-slate-300 text-slate-600">{engagement.type}</p>
            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}

export { EngagementHistoryList }
