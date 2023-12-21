"use client"

import type { FC, ReactNode } from "react"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Icons } from "@/components/Icons"

interface EngagementDeleteDialogProps {
  status: string
  id: string
  children?: ReactNode
}

const EngagementDeleteDialog: FC<EngagementDeleteDialogProps> = ({ status, id, children }) => {
  const { setSelected, deleteEngagement, deleteFromHistory, deleteFromFollowUp } = useEngagements()

  const handleDelete = () => {
    if (status === "active") {
      deleteEngagement(id)
    } else if (status === "done") {
      deleteFromHistory(id)
    } else {
      deleteFromFollowUp(id)
    }

    setSelected(null)

    toast({
      title: "Engagement successfully deleted!",
      description: "Engagement has been deleted and removed from history.",
      variant: "destructive",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="ghost"
            size="iconSm"
            className="dark:hover:!bg-slate-700 hover:!bg-slate-300"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Icons.delete className={`h-4 w-4 text-red-500`} />
            <span className="sr-only">Delete engagement</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className="dark:text-white">
            This action cannot be undone. Confirmation will permanently delete the engagement from
            storage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              type="button"
              autoFocus
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { EngagementDeleteDialog }
