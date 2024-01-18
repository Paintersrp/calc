import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"

interface Associate {
  id: number
  login: string
  shift: {
    name: string
  }
  department: {
    name: string
  }
}

interface Role {
  id: number
  name: string
}

interface Record {
  associate: Associate
  role: Role
}

interface FormattedAssociate {
  id: number
  login: string
  shift: string
  department: string
}

interface GroupedRole {
  id: number
  name: string
  associates: FormattedAssociate[]
}

export interface GroupedByRole {
  [key: string]: GroupedRole
}

function groupByRole(records: Record[]): GroupedByRole {
  const grouped: GroupedByRole = {}

  records.forEach((record) => {
    const { role, associate } = record

    if (!grouped[role.id]) {
      grouped[role.id] = {
        id: role.id,
        name: role.name,
        associates: [],
      }
    }

    grouped[role.id].associates.push({
      id: associate.id,
      login: associate.login,
      shift: associate.shift.name,
      department: associate.department.name,
    })
  })

  return grouped
}

export async function GET(_: Request) {
  try {
    const supabase = getServerClient()

    // Fetch records for the specified table and slug
    const { data: records, error } = await supabase
      .from("associates_roles")
      .select(
        `*, associate:associates (*, department:departments (*), shift:shifts (*)), role:roles (*)`
      )

    if (error) throw error

    if (!records) {
      return new NextResponse("Internal error", { status: 500 })
    }

    const groupedRecords = groupByRole(records as Record[])

    return NextResponse.json(groupedRecords)
  } catch (error) {
    console.log(`[ROSTER_GET]`, error)

    return new NextResponse("Internal error", { status: 500 })
  }
}
