"use client"

import type { FC } from "react"

import { useEngagements } from "@/lib/state/engagements"
import { Separator } from "@/components/ui/Separator"

import { ListBody } from "./parts/ListBody"
import { ListHeader } from "./parts/ListHeader"
import { ListItem } from "./parts/ListItem"
import { ListMenu } from "./parts/ListMenu"

const ActiveList: FC = () => {
  const { engagements, selected, setSelected } = useEngagements()

  const handleSelect = (id: string) => {
    if (id === selected?.id) {
      return setSelected(null)
    }

    setSelected(id)
  }

  return (
    <ul className="space-y-1.5">
      <ListHeader>Active Engagements</ListHeader>

      <Separator className="!my-4 dark:bg-slate-700 bg-slate-300" />

      <ListBody>
        {engagements.map((engagement) => (
          <ListItem key={engagement.id} engagement={engagement} handleSelect={handleSelect}>
            <ListMenu engagement={engagement} />
          </ListItem>
        ))}
      </ListBody>
    </ul>
  )
}

export { ActiveList }
