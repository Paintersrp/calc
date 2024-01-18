import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"

export async function GET(_: Request, { params }: { params: { date: string } }) {
  try {
    const supabase = getServerClient()

    if (!params.date) {
      return new NextResponse(`Date is required`, { status: 400 })
    }

    // We try to get our data by date
    const { error, data: object } = await supabase
      .from("dates")
      .select("*, plans (*, groups(*, assignments (*, associate:associates (*), role:roles (*))))")
      .eq("date", params.date)
      .order("id", { referencedTable: "plans.groups.assignments", ascending: true })
      .single()

    // If no date object exists, we create one along with shift plans and empty assignments
    if (!object) {
      console.log("New Date")
      const { data: dateData, error: dateError } = await supabase
        .from("dates")
        .insert({ date: params.date })
        .select()
        .single()

      if (dateError) throw dateError

      if (!dateData) {
        return new NextResponse(`Failed to create date`, { status: 400 })
      }

      // Once we have created a new date, we add two shift plans. One for days and one for nights
      const { data: planData, error: planError } = await supabase
        .from("plans")
        .insert([
          { date_id: dateData.id, type: "day (1st)" },
          { date_id: dateData.id, type: "day (2nd)" },
          { date_id: dateData.id, type: "night (1st)" },
          { date_id: dateData.id, type: "night (2nd)" },
        ])
        .select()

      if (planError) throw planError

      if (!planData) {
        return new NextResponse(`Failed to create shift plans`, { status: 400 })
      }

      // Retrieve group templates

      const { data: groupTemplates, error: groupTemplatesError } = await supabase
        .from("group_templates")
        .select("*, assignment_templates (*)")

      if (groupTemplatesError) throw groupTemplatesError

      const groups = planData.flatMap((plan) =>
        groupTemplates.map((template) => ({
          plan_id: plan.id,
          name: template.name,
        }))
      )

      const { data: groupData, error: groupError } = await supabase
        .from("groups")
        .insert(groups)
        .select()

      if (groupError) throw groupError

      const assignments = groupData.flatMap((group) => {
        const template = groupTemplates.find((template) => template.name === group.name)
        return template!.assignment_templates.map((assignmentTemplate) => ({
          group_id: group.id,
          role_id: assignmentTemplate.role_id,
        }))
      })

      const { error: assignmentsError } = await supabase.from("assignments").insert(assignments)

      if (assignmentsError) throw assignmentsError

      const { data: newDate, error: newDateError } = await supabase
        .from("dates")
        .select(
          "*, plans (*, groups(*, assignments (*, associate:associates (*), role:roles (*))))"
        )
        .eq("id", dateData.id)
        .single()

      if (newDateError) {
        console.log(`[PLAN_CREATION_ERROR]`, error)
        throw newDateError
      }

      return NextResponse.json(newDate)
    }

    if (error) throw error

    return NextResponse.json(object)
  } catch (error) {
    console.log(`[PLAN_GET]`, error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
