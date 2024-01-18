import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "valley_groups",
  objectName: "Valley Group",
  idField: "id",
  requiredFields: ["name"],
})
