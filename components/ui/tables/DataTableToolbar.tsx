"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/Input"

import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { DataTableViewOptions } from "./DataTableViewOptions"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterKey: string
}

export function DataTableToolbar<TData>({ table, filterKey }: DataTableToolbarProps<TData>) {
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

        {/* {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={["CRETS", "Stow", "WHD", "ICQA", "Dock", "VR"]}
          />
        )}

        {table.getColumn("shift") && (
          <DataTableFacetedFilter
            column={table.getColumn("shift")}
            title="Shift"
            options={["FHD", "BHD", "FHN", "BHN", "FLEX"]}
          />
        )}

        {table.getColumn("roles") && (
          <DataTableFacetedFilter
            column={table.getColumn("roles")}
            title="Roles"
            options={roleOptions}
          />
        )} */}

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
