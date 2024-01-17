"use client"

import type { ColumnDef } from "@tanstack/react-table"

import type { Tables } from "@/types/supabase"
import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/tables/DataTable"

import { RoleTableToolbar } from "./RoleTableToolbar"

interface RoleTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { visibility: boolean; accessorKey?: string })[]
  data: TData[]
  processes: Tables<"processes">[]
}

export function RoleTable<TData, TValue>({
  data,
  columns,
  processes,
}: RoleTableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, columns, initialPageSize: 15 })

  return (
    <DataTable<TData, TValue>
      table={table}
      columns={columns}
      toolbar={<RoleTableToolbar filterKey="name" table={table} processes={processes} />}
    />
  )
}
