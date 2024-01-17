"use client"

import { ReactNode, useState, type FC } from "react"

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

interface EditModalProps {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  onSubmit: () => void
  children: ReactNode
}

const EditModal: FC<EditModalProps> = ({
  title,
  description,
  open,
  onClose,
  onSubmit,
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    try {
      setIsLoading(true)

      onSubmit()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

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
              variant="success"
              onClick={handleSubmit}
              type="button"
              autoFocus
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { EditModal }
