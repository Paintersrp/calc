"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/Input"
import { DataTableFacetedFilter } from "@/components/ui/tables/DataTableFacetedFilter"
import { DataTableViewOptions } from "@/components/ui/tables/DataTableViewOptions"

interface StationTableToolbarProps<TData> {
  table: Table<TData>
  filterKey: string
  options: FilterOptions
}

export function StationTableToolbar<TData>({
  table,
  filterKey,
  options,
}: StationTableToolbarProps<TData>) {
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

        {table.getColumn("valley") && (
          <DataTableFacetedFilter
            column={table.getColumn("valley")}
            title="Valley"
            options={options.valleys.map((valley) => valley.name)}
          />
        )}

        {table.getColumn("valley_group") && (
          <DataTableFacetedFilter
            column={table.getColumn("valley_group")}
            title="Valley Group"
            options={options.valley_groups.map((valley) => valley.name)}
          />
        )}

        {table.getColumn("broadcast_open") && (
          <DataTableFacetedFilter
            column={table.getColumn("broadcast_open")}
            title="Broadcast Open Status"
            options={options.broadcast_options.map((option) => option.name)}
          />
        )}

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

      <DataTableViewOptions table={table} />
    </div>
  )
}
