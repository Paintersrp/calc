import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "roles",
  objectName: "Role",
  idField: "id",
  requiredFields: ["name"],
})
