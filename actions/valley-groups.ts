import { handleActions } from "@/lib/supabase/handlers/action/handleActions"
import { ValleyGroupRequest } from "@/lib/validators/valley-groups"

const {
  add: addValleyGroup,
  all: getValleyGroups,
  get: getValleyGroup,
  update: updateValleyGroup,
  del: deleteValleyGroup,
} = handleActions<ValleyGroupRequest>({
  tableName: "valley_groups",
  objectName: "Valley Group",
  requiredFields: ["name"],
})

export { addValleyGroup, getValleyGroups, getValleyGroup, updateValleyGroup, deleteValleyGroup }
