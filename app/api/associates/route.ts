import { handleTable } from "@/lib/supabase/handlers/api/handleTable"

export const { POST, GET } = handleTable({
  tableName: "associates",
  requiredFields: ["login", "department_id", "shift_id"],
  mtmConfigs: [
    {
      mtmTableName: "associates_roles",
      mtmField: "roles",
    },
  ],
})
