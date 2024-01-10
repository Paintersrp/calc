import { getServerClient } from "./hook"
import { MTMConfig } from "./types"

export const handleMTM = async <T>(
  id: string,
  tableName: string,
  mtmConfig: MTMConfig,
  data: T
) => {
  const relatedIds: string[] = data[mtmConfig.mtmField as keyof T] as unknown as string[]

  if (!relatedIds) return

  const sb = getServerClient()

  const records = relatedIds.map((relatedId) => ({
    [`${tableName}_id`]: id,
    [`${mtmConfig.mtmField}_id`]: relatedId,
  }))

  console.log(records)

  await sb.from(mtmConfig.mtmTableName).insert(records)
}
