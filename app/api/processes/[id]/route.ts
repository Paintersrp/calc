import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "processes",
  objectName: "Process",
  idField: "id",
  requiredFields: ["name"],
})
