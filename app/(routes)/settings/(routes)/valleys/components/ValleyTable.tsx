"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/tables/DataTable"

import { ValleyTableToolbar } from "./ValleyTableToolbar"

interface RosterTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { visibility: boolean; accessorKey?: string })[]
  data: TData[]
  options: FilterOptions
}

export function ValleyTable<TData, TValue>({
  columns,
  data,
  options,
}: RosterTableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, columns, initialPageSize: 25 })

  return (
    <DataTable<TData, TValue>
      table={table}
      columns={columns}
      toolbar={<ValleyTableToolbar filterKey="name" table={table} options={options} />}
    />
  )
}
