"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/Input"
import { DataTableFacetedFilter } from "@/components/ui/tables/DataTableFacetedFilter"
import { DataTableViewOptions } from "@/components/ui/tables/DataTableViewOptions"

import type { FilterOptions } from "./RosterTable"

interface RosterTableToolbarProps<TData> {
  table: Table<TData>
  filterKey: string
  options: FilterOptions
}

export function RosterTableToolbar<TData>({
  table,
  filterKey,
  options,
}: RosterTableToolbarProps<TData>) {
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

        {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={options.department.map((department) => department.name)}
          />
        )}

        {table.getColumn("shift") && (
          <DataTableFacetedFilter
            column={table.getColumn("shift")}
            title="Shift"
            options={options.shift.map((shift) => shift.name)}
          />
        )}

        {table.getColumn("roles") && (
          <DataTableFacetedFilter
            column={table.getColumn("roles")}
            title="Roles"
            options={options.roles.map((role) => role.name)}
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
