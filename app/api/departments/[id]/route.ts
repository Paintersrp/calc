import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "departments",
  objectName: "Department",
  idField: "id",
  requiredFields: ["name"],
})
