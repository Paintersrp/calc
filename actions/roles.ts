import { handleActions } from "@/lib/supabase/handlers/action/handleActions"
import { RoleRequest } from "@/lib/validators/roles"

const {
  add: addRole,
  all: getRoles,
  get: getRole,
  update: updateRole,
  del: deleteRole,
} = handleActions<RoleRequest>({
  tableName: "roles",
  objectName: "Role",
  requiredFields: ["name"],
})

export { addRole, getRoles, getRole, updateRole, deleteRole }
