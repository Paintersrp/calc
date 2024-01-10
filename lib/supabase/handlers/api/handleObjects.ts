import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"
import { MTMConfig } from "@/lib/supabase/types"
import { handleMTM } from "@/lib/supabase/utils"
import { capitalize } from "@/lib/utils"

interface ObjectHandlerConfig<T> {
  tableName: string
  objectName: string
  idField: string
  requiredFields: (keyof T)[]
  mtmConfigs?: MTMConfig[]
}

// Define a generic handler function for a specific table's objects by ID
const handleObjects = <T extends Record<string, any>>({
  tableName,
  objectName,
  idField,
  requiredFields,
  mtmConfigs,
}: ObjectHandlerConfig<T>) => {
  return {
    async GET(req: Request, { params }: { params: { [key: string]: string } }) {
      try {
        const supabase = getServerClient()

        if (!params[idField]) {
          return new NextResponse(`${objectName} ID is required`, { status: 400 })
        }

        const { searchParams } = new URL(req.url)
        const selectParam = searchParams.get("select")
        const select = selectParam?.replace(/__/g, " ") ?? "*"

        const { data: object, error } = await supabase
          .from(tableName)
          .select(select)
          .eq("id", params[idField])
          .single()

        if (error) throw error

        if (!object) {
          return new NextResponse("Internal error", { status: 500 })
        }

        return NextResponse.json(object)
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_GET]`, error)
        return new NextResponse("Internal error", { status: 500 })
      }
    },

    async PATCH(req: Request, { params }: { params: { [key: string]: string } }) {
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

        if (!params[idField]) {
          return new NextResponse(`${objectName} ID is required`, { status: 400 })
        }

        const id = params[idField]
        const dataToUpdate = { ...requestData }

        if (mtmConfigs) {
          mtmConfigs.forEach((mtmConfig) => {
            delete dataToUpdate[mtmConfig.mtmField]
          })
        }

        const { data: object, error: objectError } = await supabase
          .from(tableName)
          .update(dataToUpdate)
          .eq("id", id)
          .select(select)
          .single()

        if (objectError) throw objectError

        if (!object) {
          return new NextResponse("Internal error", { status: 500 })
        }

        if (mtmConfigs) {
          let finalSelect: string = select

          for (const mtmConfig of mtmConfigs) {
            await handleMTM<T>(id, tableName, mtmConfig, requestData)
            finalSelect += `, ${mtmConfig.mtmTableName}!inner (*, ${mtmConfig.mtmField} (*))`
          }

          const { data: updatedObject, error: updatedError } = await supabase
            .from(tableName)
            .select(finalSelect)
            .eq("id", id)
            .single()

          if (updatedError) throw updatedError

          if (!updatedObject) {
            return new NextResponse("Internal error", { status: 500 })
          }

          return NextResponse.json(updatedObject)
        }

        return NextResponse.json(object)
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_PATCH]`, error)
        return new NextResponse("Internal error", { status: 500 })
      }
    },

    async DELETE(_: Request, { params }: { params: { [key: string]: string } }) {
      try {
        const supabase = getServerClient()

        if (!params[idField]) {
          return new NextResponse(`${objectName} ID is required`, { status: 400 })
        }

        const { data: object, error } = await supabase
          .from(tableName)
          .delete()
          .eq("id", params[idField])
          .select()

        if (error) throw error

        return NextResponse.json(object)
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_DELETE]`, error)
        return new NextResponse("Internal error", { status: 500 })
      }
    },
  }
}

export { type ObjectHandlerConfig, handleObjects }
