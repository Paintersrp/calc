"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { formatTimeToNow } from "@/lib/utils"
import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/tables/DataTableColumnHeader"

import { StationRowActions } from "./StationRowActions"

export interface StationTableData {
  id: string
  name: string
  updated_at: string
  status: "working" | "not working" | "ticketed"
  broadcast_open: string
  valley: string
  valley_group: string
}

export const StationColumns: (ColumnDef<StationTableData> & { visibility: boolean })[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex">
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
      <div className="flex">
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
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-full">{row.getValue("name")}</div>
    },
    visibility: true,
  },

  {
    accessorKey: "valley",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Valley" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-full">{row.getValue("valley")}</div>
    },
    visibility: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "valley_group",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Valley Group" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-full">{row.getValue("valley_group")}</div>
    },
    visibility: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-full">{row.getValue("status")}</div>
    },
    visibility: true,
  },

  {
    accessorKey: "broadcast_open",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Broadcast Open" />,
    cell: ({ row }) => {
      return (
        <div className="truncate font-medium">
          {row.getValue("broadcast_open") ? "TRUE" : "FALSE"}
        </div>
      )
    },
    visibility: true,
    filterFn: (row, id, value) => {
      const convertedValue = row.getValue(id) === true ? "TRUE" : "FALSE"
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => {
      return (
        <div className="truncate font-medium">{formatTimeToNow(row.getValue("updated_at"))}</div>
      )
    },
    visibility: true,
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center w-8 h-8">
        <StationRowActions row={row} />
      </div>
    ),
    visibility: true,
    enableHiding: false,
  },
]
