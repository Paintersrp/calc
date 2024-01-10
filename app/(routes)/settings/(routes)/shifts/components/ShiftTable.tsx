"use client"

import type { FC } from "react"

import { Tables } from "@/types/supabase"
import { SharedColumns } from "@/components/shared/SharedColumns"
import { SharedTable } from "@/components/shared/SharedTable"

interface ShiftTableProps {
  data: Tables<"shifts">[]
}

const ShiftTable: FC<ShiftTableProps> = ({ data }) => {
  return <SharedTable columns={SharedColumns("")} data={data} />
}

export { ShiftTable }
