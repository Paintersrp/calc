"use client"

import type { FC } from "react"

import { Tables } from "@/types/supabase"
import { SharedColumns } from "@/components/shared/SharedColumns"
import { SharedTable } from "@/components/shared/SharedTable"

interface DepartmentTableProps {
  data: Tables<"departments">[]
}

const DepartmentTable: FC<DepartmentTableProps> = ({ data }) => {
  return <SharedTable columns={SharedColumns("")} data={data} />
}

export { DepartmentTable }
