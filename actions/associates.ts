import { Tables } from "@/types/supabase"
import { handleActions } from "@/lib/supabase/handlers/action/handleActions"

const {
  add: addAssociate,
  all: getAssociates,
  get: getAssociate,
  update: updateAssociate,
  del: deleteAssociate,
} = handleActions<Tables<"associates">>({
  tableName: "associates",
  objectName: "Associate",
  requiredFields: ["login", "department_id", "shift_id"],
  mtmConfigs: [
    {
      mtmTableName: "associates_roles",
      mtmField: "roles",
    },
  ],
})

export { addAssociate, getAssociates, getAssociate, updateAssociate, deleteAssociate }
