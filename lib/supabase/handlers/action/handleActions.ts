import { getServerClient } from "@/lib/supabase/hook"
import { MTMConfig } from "@/lib/supabase/types"
import { handleMTM } from "@/lib/supabase/utils"
import { capitalize } from "@/lib/utils"

interface ActionsHandlerConfig<T> {
  tableName: string
  objectName: string
  requiredFields: (keyof T)[]
  mtmConfigs?: MTMConfig[]
}

const handleActions = <T extends Record<string, any>>({
  tableName,
  objectName,
  requiredFields,
  mtmConfigs = [],
}: ActionsHandlerConfig<T>) => {
  return {
    /**
     * Add action for given table
     */
    async add(data: T, select: string = "*") {
      try {
        const supabase = getServerClient()

        // Validate all required fields are present in request
        for (const field of requiredFields) {
          if (!data[field]) {
            throw new Error(`${capitalize(field as string)} is required`)
          }
        }

        const dataToInsert = { ...data }

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
          return new Error("Internal error")
        }

        if (mtmConfigs) {
          let finalSelect: string = select

          for (const mtmConfig of mtmConfigs) {
            await handleMTM<T>(record.id, tableName, mtmConfig, data)
            finalSelect += `, ${mtmConfig.mtmTableName}!inner (*, ${mtmConfig.mtmField} (*))`
          }

          const { data: updatedObject, error: updatedError } = await supabase
            .from(tableName)
            .select(finalSelect)
            .eq("id", record.id)
            .returns<T[]>()
            .single()

          if (updatedError) throw updatedError

          if (!updatedObject) {
            throw new Error("Internal error")
          }

          return updatedObject
        }

        return record
      } catch (error) {
        console.log(`[${tableName.toUpperCase()}_POST]`, error)

        throw new Error("Internal error")
      }
    },

    /**
     * Get all action for given table
     */
    async all(select: string = "*") {
      try {
        const supabase = getServerClient()

        // Fetch records for the specified table
        const { data: records, error } = await supabase
          .from(tableName)
          .select(select)
          .order("id", { ascending: true })
          .returns<any[]>()

        if (error) throw error

        if (!records) {
          throw new Error("Internal error")
        }

        return records
      } catch (error) {
        console.log(`[${tableName.toUpperCase()}_GET]`, error)

        throw new Error("Internal error")
      }
    },

    /**
     * Get action for given table
     */
    async get(id: string, select: string = "*") {
      try {
        const supabase = getServerClient()

        const { data: object, error } = await supabase
          .from(tableName)
          .select(select)
          .eq("id", id)
          .returns<T[]>()
          .single()

        if (error) throw error

        if (!object) {
          return new Error("Internal error")
        }

        return object
      } catch (error) {
        console.error(`[${objectName.toUpperCase()}_GET]`, error)
        throw new Error("Internal error")
      }
    },

    /**
     * Update action for given table
     */
    async update(id: string, data: T, select: string = "*") {
      try {
        const supabase = getServerClient()

        for (const field of requiredFields) {
          if (!data[field]) {
            throw new Error(`${capitalize(String(field))} is required`)
          }
        }

        const dataToUpdate = { ...data }

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
          throw new Error("Internal error")
        }

        if (mtmConfigs) {
          let finalSelect: string = select

          for (const mtmConfig of mtmConfigs) {
            await handleMTM<T>(id, tableName, mtmConfig, data)
            finalSelect += `, ${mtmConfig.mtmTableName}!inner (*, ${mtmConfig.mtmField} (*))`
          }

          const { data: updatedObject, error: updatedError } = await supabase
            .from(tableName)
            .select(finalSelect)
            .eq("id", id)
            .single()

          if (updatedError) throw updatedError

          return updatedObject
        }

        return object
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_PATCH]`, error)
        throw new Error("Internal error")
      }
    },

    /**
     * Delete action for given table
     */
    async del(id: string) {
      try {
        const supabase = getServerClient()

        const { data: object, error } = await supabase
          .from(tableName)
          .delete()
          .eq("id", id)
          .select()
          .single()

        if (error) throw error

        return object
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_DELETE]`, error)
        throw new Error("Internal error")
      }
    },
  }
}

export { type ActionsHandlerConfig, handleActions }
