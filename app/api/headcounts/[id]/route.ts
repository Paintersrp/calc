import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  objectName: "Headcount",
  idField: "id",
  tableName: "valley_counts",
  requiredFields: ["count", "valley_id", "quarter_id"],
})
