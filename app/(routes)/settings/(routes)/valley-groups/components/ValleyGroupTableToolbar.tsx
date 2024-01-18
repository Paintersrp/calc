"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/Input"
import { DataTableViewOptions } from "@/components/ui/tables/DataTableViewOptions"

import { ValleyGroupAddModal } from "./ValleyGroupAddModal"

interface ValleyGroupTableToolbarProps<TData> {
  table: Table<TData>
  filterKey: string
}

export function ValleyGroupTableToolbar<TData>({
  table,
  filterKey,
}: ValleyGroupTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${filterKey}...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
          className="h-8 w-[200px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.Close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <ValleyGroupAddModal />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
