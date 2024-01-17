"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { useTable } from "@/hooks/useTable"
import { DataTable } from "@/components/ui/tables/DataTable"

import { StationTableToolbar } from "./StationTableToolbar"

interface StationTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { visibility: boolean; accessorKey?: string })[]
  data: TData[]
  options: FilterOptions
}

export function StationTable<TData, TValue>({
  columns,
  data,
  options,
}: StationTableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, columns, initialPageSize: 15 })

  return (
    <DataTable<TData, TValue>
      table={table}
      columns={columns}
      toolbar={<StationTableToolbar filterKey="name" table={table} options={options} />}
    />
  )
}
