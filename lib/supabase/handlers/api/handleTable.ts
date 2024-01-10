import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"
import { MTMConfig } from "@/lib/supabase/types"
import { handleMTM } from "@/lib/supabase/utils"
import { capitalize } from "@/lib/utils"

interface TableHandlerConfig<T> {
  tableName: string
  requiredFields: (keyof T)[]
  mtmConfigs?: MTMConfig[]
}

// Define a generic handler function for a specific table
const handleTable = <T extends Record<string, any>>({
  tableName,
  requiredFields,
  mtmConfigs,
}: TableHandlerConfig<T>) => {
  return {
    async POST(req: Request) {
      try {
        const supabase = getServerClient()
        const requestData = await req.json()
        const { searchParams } = new URL(req.url)
        const selectParam = searchParams.get("select")
        const select = selectParam?.replace(/__/g, " ") ?? "*"

        // Validate all required fields are present in request
        for (const field of requiredFields) {
          if (!requestData[field]) {
            return new NextResponse(`${capitalize(String(field))} is required`, { status: 400 })
          }
        }

        const dataToInsert = { ...requestData }

        if (mtmConfigs) {
          mtmConfigs.forEach((mtmConfig) => {
            delete dataToInsert[mtmConfig.mtmField]
          })
        }

        // Create a new record
        const { data: record, error } = await supabase
          .from(tableName)
          .insert(dataToInsert)
          .select(select)
          .returns<T[]>()
          .single()

        if (error) throw error

        if (!record) {
          return new NextResponse("Internal error", { status: 500 })
        }

        if (mtmConfigs) {
          let finalSelect: string = select

          for (const mtmConfig of mtmConfigs) {
            if (requestData[mtmConfig.mtmField].length) {
              await handleMTM<T>(record.id, tableName, mtmConfig, requestData)
              finalSelect += `, ${mtmConfig.mtmTableName}!inner (*, ${mtmConfig.mtmField} (*))`
            }
          }

          if (finalSelect !== select) {
            const { data: updatedObject, error: updatedError } = await supabase
              .from(tableName)
              .select(finalSelect)
              .eq("id", record.id)
              .single()

            if (updatedError) throw updatedError

            if (!updatedObject) {
              return new NextResponse("Internal error", { status: 500 })
            }

            return NextResponse.json(updatedObject)
          }
        }

        return NextResponse.json(record)
      } catch (error) {
        console.log(`[${tableName.toUpperCase()}_POST]`, error)

        return new NextResponse("Internal error", { status: 500 })
      }
    },

    async GET(req: Request) {
      try {
        const supabase = getServerClient()

        const { searchParams } = new URL(req.url)
        const selectParam = searchParams.get("select")
        const select = selectParam?.replace(/__/g, " ") ?? "*"

        // Fetch records for the specified table and slug
        const { data: records, error } = await supabase.from(tableName).select(select)

        if (error) throw error

        if (!records) {
          return new NextResponse("Internal error", { status: 500 })
        }

        return NextResponse.json(records)
      } catch (error) {
        console.log(`[${tableName.toUpperCase()}_GET]`, error)

        return new NextResponse("Internal error", { status: 500 })
      }
    },
  }
}

export { type TableHandlerConfig, handleTable }
