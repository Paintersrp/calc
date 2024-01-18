"use client"

import { useState, type FC } from "react"
import axios from "axios"
import { toast } from "sonner"

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
import { Icons } from "@/components/ui/Icons"

import { useShiftPlanData } from "./ShiftPlanDataProvider"

interface AssignmentDeleteModalProps {
  id: string | number
}

const AssignmentDeleteModal: FC<AssignmentDeleteModalProps> = ({ id }) => {
  const { refetchPlanData } = useShiftPlanData()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/assignments/${id}`)
      await refetchPlanData()
    } catch (error) {
      console.error(error)

      toast.error("Error", {
        description: `Assignment deletion failed. Please try again.`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructiveInvert" size="iconSm" className="w-6 h-6">
          <Icons.Delete className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this Assignment?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end">
          <DialogClose asChild>
            <Button disabled={isLoading} isLoading={isLoading} type="button">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              variant="destructive"
              onClick={onDelete}
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

export { AssignmentDeleteModal }
