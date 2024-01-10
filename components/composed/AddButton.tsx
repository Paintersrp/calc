"use client"

import { useAddModal } from "@/hooks/useAddModal"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"

import { Text } from "../ui/Text"
import { TooltipWrapper } from "../ui/Tooltip"

function AddButton() {
  const { onOpen } = useAddModal()

  return (
    <TooltipWrapper
      content={
        <div className="space-y-1">
          <Text className="font-medium">Add new roster entry</Text>
          <Text className="text-sm !text-muted-foreground">
            <kbd className="rounded-md border bg-accent px-1 py-0.5 text-sm font-bold">CTRL-Q</kbd>
            {"  "} to open with shortcut
          </Text>
        </div>
      }
    >
      <Button onClick={onOpen} variant="outline" size="sm" className="ml-auto flex h-8">
        <Icons.PlusSquare className="mr-2 h-5 w-5" />
        Add
      </Button>
    </TooltipWrapper>
  )
}

export { AddButton }
