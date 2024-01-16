import { handleTable } from "@/lib/supabase/handlers/api/handleTable"

export const { POST, GET } = handleTable({
  tableName: "valley_counts",
  requiredFields: ["count", "valley_id", "quarter_id"],
})
