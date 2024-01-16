"use client"

import { useState } from "react"
import Link from "next/link"
import type { Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { DeleteModal } from "@/app/(routes)/roster/components/DeleteModal"
import { EditModal } from "@/app/(routes)/roster/components/EditModal"

import type { ValleyTableData } from "./ValleyColumns"

interface ValleyRowActionsProps {
  row: Row<ValleyTableData>
}

export function ValleyRowActions({ row }: ValleyRowActionsProps) {
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

      <div className="flex gap-2">
        <TooltipWrapper content="View Valley Page">
          <Link
            href={`/valleys/${row.original.id}`}
            className={buttonVariants({ variant: "infoInvert", size: "iconSm" })}
          >
            <Icons.Page className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Link>
        </TooltipWrapper>
        <TooltipWrapper content="Edit Valley">
          <Button size="iconSm" variant="successInvert" onClick={onOpenEdit}>
            <Icons.Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="Delete Valley">
          <Button size="iconSm" variant="destructiveInvert" onClick={onOpenDelete}>
            <Icons.Delete className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </TooltipWrapper>
      </div>
    </>
  )
}
