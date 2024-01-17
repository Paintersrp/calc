"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/tables/DataTable"

import { ShiftTableToolbar } from "./ShiftTableToolbar"

interface ShiftTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { visibility: boolean; accessorKey?: string })[]
  data: TData[]
}

export function ShiftTable<TData, TValue>({ data, columns }: ShiftTableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, columns, initialPageSize: 15 })

  return (
    <DataTable<TData, TValue>
      table={table}
      columns={columns}
      toolbar={<ShiftTableToolbar filterKey="name" table={table} />}
    />
  )
}
