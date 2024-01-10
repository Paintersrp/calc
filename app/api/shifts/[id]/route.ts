import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "shifts",
  objectName: "shift",
  idField: "id",
  requiredFields: ["name"],
})
