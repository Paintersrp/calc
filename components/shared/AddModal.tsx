"use client"

import { useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"

import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Icons } from "@/components/ui/Icons"
import { Text } from "@/components/ui/Text"
import { TooltipWrapper } from "@/components/ui/Tooltip"

interface AddModalProps {
  title: string
  tooltip: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  keepOpen: boolean
  setKeepOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: () => void
  isLoading: boolean
  children: ReactNode
}

const AddModal: FC<AddModalProps> = ({
  title,
  tooltip,
  open,
  setOpen,
  keepOpen,
  setKeepOpen,
  onSubmit,
  isLoading,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TooltipWrapper content={tooltip}>
          <Button variant="outline" size="sm" className="ml-auto flex h-8">
            <Icons.PlusSquare className="mr-2 h-5 w-5" />
            Add
          </Button>
        </TooltipWrapper>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}

        <DialogFooter className="gap-2 sm:gap-0 justify-between w-full">
          <div className="flex w-full items-center">
            <Checkbox checked={keepOpen} onCheckedChange={() => setKeepOpen(!keepOpen)} />
            <Text className="ml-2 font-medium text-sm">Add another?</Text>
          </div>
          <DialogClose asChild>
            <Button disabled={isLoading} type="button">
              Cancel
            </Button>
          </DialogClose>

          <Button
            isLoading={isLoading}
            disabled={isLoading}
            variant="success"
            onClick={onSubmit}
            type="button"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AddModal }
