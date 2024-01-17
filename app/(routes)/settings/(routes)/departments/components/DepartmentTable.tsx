"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/tables/DataTable"

import { DepartmentTableToolbar } from "./DepartmentTableToolbar"

interface DepartmentTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { visibility: boolean; accessorKey?: string })[]
  data: TData[]
}

export function DepartmentTable<TData, TValue>({
  data,
  columns,
}: DepartmentTableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, columns, initialPageSize: 15 })

  return (
    <DataTable<TData, TValue>
      table={table}
      columns={columns}
      toolbar={<DepartmentTableToolbar filterKey="name" table={table} />}
    />
  )
}
