"use client"

import { useState } from "react"
import type { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/ui/Icons"
import { DeleteModal } from "@/components/shared/DeleteModal"

import type { RoleColumn } from "./RoleColumns"
import { RoleEditModal } from "./RoleEditModal"

interface RoleRowActionsProps {
  row: Row<RoleColumn>
}

export function RoleRowActions({ row }: RoleRowActionsProps) {
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
      <DeleteModal
        open={deleteOpen}
        onClose={handleDeleteOpen}
        route="roles"
        id={row.original.id}
        objectName="role"
      />
      <RoleEditModal row={row} open={editOpen} onClose={handleEditOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <Icons.MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
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
