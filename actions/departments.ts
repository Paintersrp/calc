import { handleActions } from "@/lib/supabase/handlers/action/handleActions"
import { DepartmentRequest } from "@/lib/validators/departments"

const {
  add: addDepartment,
  all: getDepartments,
  get: getDepartment,
  update: updateDepartment,
  del: deleteDepartment,
} = handleActions<DepartmentRequest>({
  tableName: "departments",
  objectName: "Department",
  requiredFields: ["name"],
})

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment }
