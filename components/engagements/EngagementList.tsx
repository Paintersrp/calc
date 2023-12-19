"use client"

import type { FC } from "react"
import { format } from "date-fns"

import { useEngagementStore } from "@/lib/state/engagements"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"

import EngagementAddDialog from "./EngagementAddDialog"

const EngagementList: FC = () => {
  const { engagements, selected, setSelected } = useEngagementStore()

  const handleSelect = (id: string) => {
    if (id === selected?.id) {
      return setSelected(null)
    }

    setSelected(id)
  }

  return (
    <ul className="space-y-1.5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Engagement List</h1>
        <EngagementAddDialog />
      </div>

      <Separator className="!my-4 dark:bg-slate-700 bg-slate-300" />

      {engagements.map((engagement) => (
        <div key={engagement.id}>
          <Button
            variant={selected?.id === engagement.id ? "accent" : "ghost"}
            className="flex flex-col w-full py-10 justify-center items-start"
            onClick={() => handleSelect(engagement.id)}
          >
            <div className="flex flex-col items-start w-full">
              <h3 className="text-lg dark:font-semibold">{engagement.title}</h3>
              <p className="dark:text-blue-400 text-blue-600">
                {format(engagement.date, "MMMM d, hh:mm b")}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="dark:text-slate-300 text-slate-600">Login: {engagement.login}</p>
              <p className="dark:text-slate-300 text-slate-600">{engagement.type}</p>
            </div>
          </Button>
        </div>
      ))}
    </ul>
  )
}

export { EngagementList }
