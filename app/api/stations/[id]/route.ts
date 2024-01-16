import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  objectName: "Station",
  idField: "id",
  tableName: "stations",
  requiredFields: ["valley_id", "name", "status", "broadcast_open"],
})
