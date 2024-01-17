import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  objectName: "Valley",
  idField: "id",
  tableName: "valleys",
  requiredFields: ["group_id", "name"],
})
