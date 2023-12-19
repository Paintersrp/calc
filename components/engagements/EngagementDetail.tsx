"use client"

import type { FC } from "react"
import { format } from "date-fns"

import { useEngagementStore } from "@/lib/state/engagements"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"

const EngagementDetail: FC = () => {
  const { selected } = useEngagementStore()

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
    // Add notification or indication that details are copied
  }

  const handleExportDetails = () => {
    const details = `Title: ${selected.title}\nDescription: ${selected.description}\nDate: ${selected.date}\nType: ${selected.type}`
    const blob = new Blob([details], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Engagement-${selected.id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center items-start gap-2 justify-between">
        <h1 className="text-2xl font-medium">Engagement Details</h1>
        <div className="flex space-x-2 justify-end items-end">
          <Button onClick={handleCopyDetails} variant="outline">
            Copy Details
          </Button>
          <Button onClick={handleExportDetails} variant="accent">
            Export as Text
          </Button>
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
    </div>
  )
}

export { EngagementDetail }
