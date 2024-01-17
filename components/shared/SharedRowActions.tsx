"use client"

import { useState } from "react"
import type { Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/ui/Icons"
import { DeleteModal } from "@/components/shared/DeleteModal"
import { EditModal } from "@/components/shared/EditModal"

import { SharedColumn } from "./SharedColumns"

interface SharedRowActionsProps {
  row: Row<SharedColumn>
  apiRoute: string
}

export function SharedRowActions({ row, apiRoute }: SharedRowActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const onOpenEdit = () => {
    setOpenEdit(true)
  }

  const onCloseEdit = () => {
    setOpenEdit(false)
  }

  const onOpenDelete = () => {
    setOpenDelete(true)
  }

  const onCloseDelete = () => {
    setOpenDelete(false)
  }

  const onEdit = async () => {
    try {
      setIsLoading(true)

      // todo improve
      toast.success("success")
    } catch (error) {
      // todo improve
      toast.error("error")
    } finally {
      setIsLoading(false)
      setOpenDelete(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      // todo improve
      toast.success("success")
    } catch (error) {
      // todo improve
      toast.error("error")
    } finally {
      setIsLoading(false)
      setOpenDelete(false)
    }
  }

  return (
    <>
      <DeleteModal
        open={openDelete}
        onClose={onCloseDelete}
        isLoading={isLoading}
        onConfirm={onDelete}
      />
      <EditModal open={openEdit} onClose={onCloseEdit} isLoading={isLoading} onConfirm={onEdit} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <Icons.MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={onOpenEdit}>
            <Icons.Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onOpenDelete}>
            <Icons.Delete className="mr-2 h-4 w-4" />
            <span>Delete</span>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
