"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { formatTimeToNow } from "@/lib/utils"
import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/tables/DataTableColumnHeader"

import { ValleyGroupRowActions } from "./ValleyGroupRowActions"

export type ValleyGroupColumn = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export const ValleyGroupColumns: (ColumnDef<ValleyGroupColumn> & { visibility: boolean })[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex max-w-[40px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[40px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    visibility: true,
  },

  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium max-w-[40px]">{row.getValue("id")}</div>
    },
    visibility: true,
  },

  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-[400px]">{row.getValue("name")}</div>
    },
    visibility: true,
  },

  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => {
      return (
        <div className="truncate font-medium w-[100px]">
          {formatTimeToNow(row.getValue("updated_at"))}
        </div>
      )
    },
    visibility: true,
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ValleyGroupRowActions row={row} />
      </div>
    ),
    visibility: true,
    enableHiding: false,
  },
]
