"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/tables/DataTable"

import { ProcessTableToolbar } from "./ProcessTableToolbar"

interface ProcessTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { visibility: boolean; accessorKey?: string })[]
  data: TData[]
}

export function ProcessTable<TData, TValue>({ data, columns }: ProcessTableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, columns, initialPageSize: 15 })

  return (
    <DataTable<TData, TValue>
      table={table}
      columns={columns}
      toolbar={<ProcessTableToolbar filterKey="name" table={table} />}
    />
  )
}
