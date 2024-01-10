import { handleTable } from "@/lib/supabase/handlers/api/handleTable"

export const { POST, GET } = handleTable({
  tableName: "roles",
  requiredFields: ["name"],
})
