import { handleActions } from "@/lib/supabase/handlers/action/handleActions"
import { ProcessRequest } from "@/lib/validators/processes"

const {
  add: addProcess,
  all: getProcesses,
  get: getProcess,
  update: updateProcess,
  del: deleteProcess,
} = handleActions<ProcessRequest>({
  tableName: "processes",
  objectName: "Process",
  requiredFields: ["name"],
})

export { addProcess, getProcesses, getProcess, updateProcess, deleteProcess }
