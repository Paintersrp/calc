import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  objectName: "Assignment",
  idField: "id",
  tableName: "assignments",
  requiredFields: [],
})
