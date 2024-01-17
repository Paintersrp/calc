import { handleTable } from "@/lib/supabase/handlers/api/handleTable"

export const { POST, GET } = handleTable({
  tableName: "valleys",
  requiredFields: ["group_id", "name"],
})
