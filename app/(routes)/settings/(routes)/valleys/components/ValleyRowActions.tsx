"use client"

import { useState } from "react"
import Link from "next/link"
import type { Row } from "@tanstack/react-table"

import { Button, buttonVariants } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { DeleteModal } from "@/components/shared/DeleteModal"

import type { ValleyColumn } from "./ValleyColumns"
import { ValleyEditModal } from "./ValleyEditModal"

interface ValleyRowActionsProps {
  row: Row<ValleyColumn>
}

export function ValleyRowActions({ row }: ValleyRowActionsProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const handleEditOpen = () => {
    setEditOpen(!editOpen)
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteOpen)
  }

  return (
    <>
      <ValleyEditModal row={row} open={editOpen} onClose={handleEditOpen} />
      <DeleteModal
        open={deleteOpen}
        onClose={handleDeleteOpen}
        route="valleys"
        id={row.original.id}
        objectName="valley"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <Icons.MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/valleys/${row.original.id}`}>
              <Icons.Page className="mr-2 h-4 w-4 text-info" />
              <span>View Page</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleEditOpen}>
            <Icons.Edit className="mr-2 h-4 w-4 text-success" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDeleteOpen}>
            <Icons.Delete className="mr-2 h-4 w-4 text-destructive" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
