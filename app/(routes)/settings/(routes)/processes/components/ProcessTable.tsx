"use client"

import type { FC } from "react"

import { Tables } from "@/types/supabase"
import { SharedColumns } from "@/components/shared/SharedColumns"
import { SharedTable } from "@/components/shared/SharedTable"

interface ProcessTableProps {
  data: Tables<"processes">[]
}

const ProcessTable: FC<ProcessTableProps> = ({ data }) => {
  return <SharedTable columns={SharedColumns("")} data={data} />
}

export { ProcessTable }
