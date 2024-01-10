import { handleObjects } from "@/lib/supabase/handlers/api/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "associates",
  objectName: "Associate",
  idField: "id",
  requiredFields: ["login", "department_id", "shift_id"],
  mtmConfigs: [
    {
      mtmTableName: "associates_roles",
      mtmField: "roles",
    },
  ],
})
