"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { parseISO } from "date-fns"

import { formatTimeToNow } from "@/lib/utils"
import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/tables/DataTableColumnHeader"

import { RosterRowActions } from "./RosterRowActions"

export interface RosterTableData {
  id: string
  login: string
  department: string
  shift: string
  roles: string[]
  updated_at: string
}

export const RosterColumns: (ColumnDef<RosterTableData> & { visibility: boolean })[] = [
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
    accessorKey: "login",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Login" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium max-w-[100px]">{row.getValue("login")}</div>
    },
    visibility: true,
  },

  {
    accessorKey: "department",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dpt" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-[50px]">{row.getValue("department")}</div>
    },
    visibility: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "shift",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shift" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium w-[50px]">{row.getValue("shift")}</div>
    },
    visibility: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "roles",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Roles" />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-1 min-w-full">
          {(row.getValue("roles") as string[]).map((role, index) => (
            <span
              key={index}
              className="bg-accent text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {role}
            </span>
          ))}
        </div>
      )
    },
    visibility: true,
    filterFn: (row, id, filterValues) => {
      const entryRoles = row.getValue(id) as string[]
      return (filterValues as string[]).some((filterValue) => {
        const lowerCaseFilterValue = filterValue.toLowerCase()
        return entryRoles.some((role) => role.toLowerCase().includes(lowerCaseFilterValue))
      })
    },
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
      <div className="flex justify-center w-8 h-8">
        <RosterRowActions row={row} />
      </div>
    ),
    visibility: true,
    enableHiding: false,
  },
]
