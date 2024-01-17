"use client"

import { useState, type FC } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { capitalize } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"

interface DeleteModalProps {
  open: boolean
  onClose: () => void
  route: string
  id: string | number
  objectName: string
}

const DeleteModal: FC<DeleteModalProps> = ({ open, onClose, route, id, objectName }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${route}/${id}`)

      router.refresh()

      toast.success("Success", {
        description: `${capitalize(objectName)} has been deleted successfully.`,
      })
    } catch (error) {
      console.error(error)

      toast.error("Error", {
        description: `${capitalize(objectName)} deletion failed. Please try again.`,
      })
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this {objectName}?</DialogTitle>
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

export { DeleteModal }
