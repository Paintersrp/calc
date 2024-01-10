"use client"

import type { FC } from "react"

import { Tables } from "@/types/supabase"
import { SharedColumns } from "@/components/shared/SharedColumns"
import { SharedTable } from "@/components/shared/SharedTable"

interface RoleTableProps {
  data: Tables<"departments">[]
}

const RoleTable: FC<RoleTableProps> = ({ data }) => {
  return <SharedTable columns={SharedColumns("")} data={data} />
}

export { RoleTable }
