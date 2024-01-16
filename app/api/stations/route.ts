import { handleTable } from "@/lib/supabase/handlers/api/handleTable"

export const { POST, GET } = handleTable({
  tableName: "stations",
  requiredFields: ["valley_id", "name", "status", "broadcast_open"],
})
